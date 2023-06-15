const express = require("express");
const { Sequelize, Op } = require("sequelize");
const { User, MenuSet, Diet } = require("../models");
const axios = require("axios");
const Joi = require("joi");
var jwt = require("jsonwebtoken");
const user = require("../models/user");

const ApiKey = "5598ef16d03246a18be2d241f48e9009";
const JWT_KEY = "KimJisoo";

// =============================================================================

async function checkSetName(name) {
  let set = await MenuSet.findOne({
    where: {
      menu_set_name: name,
    },
  });
  if (set == null) return true;
  else throw new Error("menu set name taken");
}
const menuSet = async (req, res) => {
  let { menu_set_name, menu_list } = req.body;
  const schema = Joi.object({
    menu_set_name: Joi.string().external(checkSetName).required(),
    menu_list: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          qty: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  var userdata = req.body.user;

  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  let menu = [];
  let totalCalories = 0;
  for (let i = 0; i < menu_list.length; i++) {
    let returnvalue;
    try {
      returnvalue = await axios.get(
        `https://api.spoonacular.com/food/menuItems/${menu_list[i].id}?apiKey=${ApiKey}&addMenuItemInformation=true`
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Invalid ID" });
    }

    let result = returnvalue.data;
    tempMenu = {
      menuId: result.id,
      menuName: result.title,
      qty: menu_list[i].qty,
      menuCalories: result.nutrition.calories,
    };
    totalCalories += result.nutrition.calories * menu_list[i].qty;
    menu.push(tempMenu);
  }
  let total = await MenuSet.findAll({ paranoid: false });
  let idSet = total.length + 1;
  if (idSet <= 9) idSet = "MS00" + idSet;
  else if (idSet <= 99) idSet = "MS0" + idSet;
  else idSet = "MS" + idSet;
  try {
    let set = await MenuSet.create({
      menu_set_id: idSet,
      menu_set_name: menu_set_name,
      menu_content: JSON.stringify(menu),
      menu_set_total_calories: totalCalories,
      menu_set_maker: userdata.username,
    });
  } catch (error) {
    return res.status(400).send({
      error,
    });
  }

  return res.status(200).json({
    message: "menu set added",
    menu_set_id: idSet,
    menu_set_name: menu_set_name,
    menu: menu,
    total_calories: totalCalories,
  });
};

// =============================================================================

async function checkMenuSet(id) {
  let set = await MenuSet.findOne({
    where: {
      menu_set_id: id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  console.log(set);
  if (set == null) throw new Error("menu set not found");
  else return true;
}

async function checkMenuSetAddDiet(id, helpers, username) {
  let set = await MenuSet.findOne({
    where: {
      menu_set_maker: username,
      menu_set_id: id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  console.log(set);
  if (set == null) throw new Error("menu set not found");
  else return true;
}

async function checkDietName(name) {
  let set = await Diet.findOne({
    where: {
      diet_name: name,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  if (set == null) return true;
  else throw new Error("diet name taken");
}

const diet = async (req, res) => {
  let { diet_name, breakfast, lunch, dinner, diet_price } = req.body;
  let userdata = req.body.user;

  const schema = Joi.object({
    diet_name: Joi.string().external(checkDietName).required(),
    breakfast: Joi.string()
      .external((value, helpers) => {
        return checkMenuSetAddDiet(value, helpers, userdata.username);
      })
      .required(),
    lunch: Joi.string()
      .external((value, helpers) => {
        return checkMenuSetAddDiet(value, helpers, userdata.username);
      })
      .required(),
    dinner: Joi.string()
      .external((value, helpers) => {
        return checkMenuSetAddDiet(value, helpers, userdata.username);
      })
      .required(),
    diet_price: Joi.number().min(0).required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }

  try {
    let dietContent = [];
    let totalCalories = 0;
    let meal = [
      { time: "breakfast", id: breakfast },
      { time: "lunch", id: lunch },
      { time: "dinner", id: dinner },
    ];

    for (let j = 0; j < meal.length; j++) {
      let mealSet = await MenuSet.findByPk(meal[j].id);

      if (mealSet) {
        const menu = JSON.parse(mealSet.menu_content);
        const menuSet = menu.map((item) => item.menuName);
        const tempDiet = {
          id_menu_set: mealSet.menu_set_id,
          time: meal[j].time,
          menu_set: menuSet,
        };

        totalCalories += mealSet.menu_set_total_calories;
        dietContent.push(tempDiet);
      }
    }

    let total = await Diet.findAll({ paranoid: false });
    let idDiet = total.length + 1;
    if (idDiet <= 9) idDiet = "D00" + idDiet;
    else if (idDiet <= 99) idDiet = "D0" + idDiet;
    else idDiet = "D" + idDiet;

    let diet = await Diet.create({
      diet_id: idDiet,
      diet_name: diet_name,
      diet_content: JSON.stringify(dietContent),
      diet_total_calories: totalCalories,
      diet_maker: userdata.username,
      diet_price: diet_price,
    });

    return res.status(200).json({
      message: "diet added",
      diet_id: idDiet,
      diet_name: diet_name,
      diet_price: diet_price,
      diet_calories: totalCalories,
      diet_content: dietContent,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

const deleteMenu = async (req, res) => {
  let { id_menu_set } = req.params;
  let { delete_if_used } = req.body;

  let schema = Joi.object({
    id_menu_set: Joi.string().external(checkMenuSetById).required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.params);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  schema = Joi.object({
    delete_if_used: Joi.string().valid("true", "false").required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    var cekIfMenuSetBelongsToUser = await MenuSet.findAll({
      where: { menu_set_maker: userdata.username, menu_set_id: id_menu_set },
    });
    if (cekIfMenuSetBelongsToUser.length == 0) {
      return res.status(403).json("Unauthorized access");
    }
    if (delete_if_used == "false") {
      let diet = await Diet.findOne({
        where: {
          diet_content: {
            [Op.like]: `%${id_menu_set}%`,
          },
        },
        paranoid: false,
      });
      if (diet == null) {
        let set = await MenuSet.destroy({
          where: { menu_set_id: id_menu_set },
        });
        return res.status(200).send("Successfully deleted");
      } else {
        return res
          .status(400)
          .send(
            "Menu set terdaftar pada sebuah diet (delete_if_used = true jika ingin hapus menu set dan diet yang mengadung menu set tersebut)"
          );
      }
    } else if ((delete_if_used = "true")) {
      let diet = await Diet.destroy({
        where: {
          diet_content: {
            [Op.like]: `%${id_menu_set}%`,
          },
        },
      });
      let set = await MenuSet.destroy({ where: { menu_set_id: id_menu_set } });
      return res.status(200).send("Successfully Deleted");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

async function checkDiet(id) {
  console.log(id);
  let set = await Diet.findOne({
    where: {
      diet_id: id,
    },
  });
  if (set == null) throw new Error("diet not found");
  else return true;
}

const deleteDiet = async (req, res) => {
  let { id_diet } = req.params;

  const schema = Joi.object({
    id_diet: Joi.string().external(checkDiet).required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.params);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    var cekIfDietBelongsToUser = await Diet.findAll({
      where: { diet_maker: userdata.username, diet_id: id_diet },
    });
    if (cekIfDietBelongsToUser.length == 0) {
      return res.status(403).json("Unauthorized access");
    }

    const result = await Diet.destroy({ where: { diet_id: id_diet } });

    return res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
// =============================================================================
let number = 10;

async function getMenuByNutriens(req, res, query, param) {
  try {
    const returnvalue = await axios.get(
      `https://api.spoonacular.com/food/menuItems/search?query=${query}&${param}&apiKey=${ApiKey}&addMenuItemInformation=true&number=${number}`
    );
    const result = returnvalue.data.menuItems;
    const menu = [];

    for (let i = 0; i < result.length; i++) {
      const tempMenu = {
        menu_id: result[i].id,
        menu_name: result[i].title,
        calories: result[i].nutrition.calories,
        fat: result[i].nutrition.fat,
        protein: result[i].nutrition.protein,
        carbohydrates: result[i].nutrition.carbs,
      };
      menu.push(tempMenu);
    }

    return res.status(200).json({
      total: menu.length,
      menu,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error fetching data" });
  }
}

const getMenu = async (req, res) => {
  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }

  let {
    id_menu,
    nama_menu,
    min_calories,
    max_calories,
    min_carbohydrates,
    max_carbohydrates,
    min_protein,
    max_protein,
    min_fat,
    max_fat,
  } = req.query;

  const schema = Joi.object({
    id_menu: Joi.string(),
    nama_menu: Joi.string(),
    min_calories: Joi.number().min(1).max(5000),
    max_calories: Joi.number().min(1).max(1290),
    min_carbohydrates: Joi.number().min(1).max(117),
    max_carbohydrates: Joi.number().min(1).max(117),
    min_protein: Joi.number().min(1).max(105),
    max_protein: Joi.number().min(1).max(105),
    min_fat: Joi.number().min(1).max(110),
    max_fat: Joi.number().min(1).max(110),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.query);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  try {
    let menu = [];
    if (id_menu != undefined) {
      try {
        returnvalue = await axios.get(
          `https://api.spoonacular.com/food/menuItems/${id_menu}?apiKey=${ApiKey}`
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid ID" });
      }
      let result = returnvalue.data;
      return res.status(200).json({
        menu_id: result.id,
        menu_name: result.title,
        calories: result.nutrition.calories,
        fat: result.nutrition.fat,
        protein: result.nutrition.protein,
        carbohydrates: result.nutrition.carbs,
      });
    } else if (nama_menu != undefined && min_calories != undefined) {
      getMenuByNutriens(req, res, nama_menu, `minCalories=${min_calories}`);
    } else if (nama_menu != undefined && max_calories != undefined) {
      getMenuByNutriens(req, res, nama_menu, `maxCalories=${max_calories}`);
    } else if (nama_menu != undefined && min_carbohydrates != undefined) {
      getMenuByNutriens(req, res, nama_menu, `minCarbs=${min_carbohydrates}`);
    } else if (nama_menu != undefined && max_carbohydrates != undefined) {
      getMenuByNutriens(req, res, nama_menu, `maxCarbs=${max_carbohydrates}`);
    } else if (nama_menu != undefined && min_protein != undefined) {
      getMenuByNutriens(req, res, nama_menu, `minProtein=${min_protein}`);
    } else if (nama_menu != undefined && max_protein != undefined) {
      getMenuByNutriens(req, res, nama_menu, `maxProtein=${max_protein}`);
    } else if (nama_menu != undefined && min_fat != undefined) {
      getMenuByNutriens(req, res, nama_menu, `minFat=${min_fat}`);
    } else if (nama_menu != undefined && max_fat != undefined) {
      getMenuByNutriens(req, res, nama_menu, `maxFat=${max_fat}`);
    } else if (nama_menu != undefined) {
      try {
        returnvalue = await axios.get(
          `https://api.spoonacular.com/food/menuItems/search?query=${nama_menu}&apiKey=${ApiKey}&number=${number}&addMenuItemInformation=true`
        );
      } catch (error) {
        return res.status(400).json({ message: "Invalid name" });
      }
      let result = returnvalue.data.menuItems;
      for (let i = 0; i < result.length; i++) {
        let tempMenu = {
          menu_id: result[i].id,
          menu_name: result[i].title,
          calories: result[i].nutrition.calories,
          fat: result[i].nutrition.fat,
          protein: result[i].nutrition.protein,
          carbohydrates: result[i].nutrition.carbs,
        };
        menu.push(tempMenu);
      }
      return res.status(200).json({
        total: menu.length,
        menu,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

async function checkMenuSetById(id) {
  if (id != undefined) {
    let set = await MenuSet.findByPk(id);
    if (set == null) throw new Error("menu set not found");
    else return true;
  }
}

async function checkMenuSetByName(name) {
  if (name != undefined) {
    let set = await MenuSet.findOne({
      where: {
        menu_set_name: { [Op.like]: `%${name}%` },
      },
    });
    if (set == null) throw new Error("menu set not found");
    else return true;
  }
}

const getSet = async (req, res) => {
  let { id_menu_set, nama_menu_set, min_calories, max_calories } = req.query;

  const schema = Joi.object({
    id_menu_set: Joi.string().external(checkMenuSetById),
    nama_menu_set: Joi.string().external(checkMenuSetByName),
    min_calories: Joi.number().min(1).max(10000),
    max_calories: Joi.number().min(1).max(10000),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.query);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    if (
      id_menu_set == undefined &&
      nama_menu_set == undefined &&
      min_calories == undefined &&
      max_calories == undefined
    ) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else if (id_menu_set != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_id: id_menu_set,
          menu_set_maker: userdata.username,
        },
      });
      if (set.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({
          id_menu_set: set[0].menu_set_id,
          nama_menu_set: set[0].menu_set_name,
          total_calories: set[0].menu_set_total_calories,
          menu_content: JSON.parse(set[0].menu_content),
        });
      }
    } else if (nama_menu_set != undefined && min_calories != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_name: { [Op.like]: `%${nama_menu_set}%` },
          menu_set_total_calories: { [Op.gte]: min_calories },
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else if (nama_menu_set != undefined && max_calories != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_name: { [Op.like]: `%${nama_menu_set}%` },
          menu_set_total_calories: { [Op.lte]: max_calories },
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else if (nama_menu_set != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_name: { [Op.like]: `%${nama_menu_set}%` },
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else if (min_calories != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_total_calories: { [Op.gte]: min_calories },
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else if (max_calories != undefined) {
      let set = await MenuSet.findAll({
        where: {
          menu_set_total_calories: { [Op.lte]: max_calories },
          menu_set_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_menu_set: set[i].menu_set_id,
          nama_menu_set: set[i].menu_set_name,
          total_calories: set[i].menu_set_total_calories,
          menu_content: JSON.parse(set[i].menu_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

const updateSet = async (req, res) => {
  let { id_menu_set } = req.params;
  let { action, menu_list } = req.body;

  let schema = Joi.object({
    id_menu_set: Joi.string().external(checkMenuSetById).required(),
  });

  try {
    await schema.validateAsync(req.params);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  schema = Joi.object({
    action: Joi.string().valid("add", "replace").required(),
    menu_list: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          qty: Joi.number().integer().min(1).required(),
        })
      )
      .min(1)
      .required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    var cekIfMenuSetBelongsToUser = await MenuSet.findAll({
      where: { menu_set_maker: userdata.username, menu_set_id: id_menu_set },
    });
    if (cekIfMenuSetBelongsToUser.length == 0) {
      return res.status(403).json("Unauthorized access");
    }

    if (action == "add") {
      let set = await MenuSet.findByPk(id_menu_set);
      let content = JSON.parse(set.menu_content);

      for (let i = 0; i < menu_list.length; i++) {
        for (let j = 0; j < content.length; j++) {
          if (content[j].menuId == menu_list[i].id) {
            return res.status(400).send("Menu sudah ada di menu set ini");
          }
        }
      }
      let totalCalories = set.menu_set_total_calories;
      for (let i = 0; i < menu_list.length; i++) {
        let returnvalue;
        try {
          returnvalue = await axios.get(
            `https://api.spoonacular.com/food/menuItems/${menu_list[i].id}?apiKey=${ApiKey}&addMenuItemInformation=true`
          );
        } catch (error) {
          return res.status(400).json({ message: "Invalid ID" });
        }

        let result = returnvalue.data;
        tempMenu = {
          menuId: result.id,
          menuName: result.title,
          qty: menu_list[i].qty,
          menuCalories: result.nutrition.calories,
        };
        totalCalories += result.nutrition.calories * menu_list[i].qty;
        content.push(tempMenu);
      }
      let newSet = await MenuSet.update(
        {
          menu_content: JSON.stringify(content),
          menu_set_total_calories: totalCalories,
        },
        {
          where: {
            menu_set_id: id_menu_set,
          },
        }
      );
      return res.status(200).send("Successfully updated");
    } else if (action == "replace") {
      let menu = [];
      let totalCalories = 0;
      for (let i = 0; i < menu_list.length; i++) {
        let returnvalue;
        try {
          returnvalue = await axios.get(
            `https://api.spoonacular.com/food/menuItems/${menu_list[i].id}?apiKey=${ApiKey}&addMenuItemInformation=true`
          );
        } catch (error) {
          return res.status(400).json({ message: "Invalid ID" });
        }

        let result = returnvalue.data;
        tempMenu = {
          menuId: result.id,
          menuName: result.title,
          qty: menu_list[i].qty,
          menuCalories: result.nutrition.calories,
        };
        totalCalories += result.nutrition.calories * menu_list[i].qty;
        menu.push(tempMenu);
      }
      let newSet = await MenuSet.update(
        {
          menu_content: JSON.stringify(menu),
          menu_set_total_calories: totalCalories,
        },
        {
          where: {
            menu_set_id: id_menu_set,
          },
        }
      );
      return res.status(200).send("Successfully updated");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

const updateDiet = async (req, res) => {
  let { id_diet } = req.params;
  let { breakfast, lunch, dinner } = req.body;

  let schema = Joi.object({
    id_diet: Joi.string().external(checkDiet).required(),
  });

  try {
    await schema.validateAsync(req.params);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  schema = Joi.object({
    breakfast: Joi.string().external(checkMenuSet).required(),
    lunch: Joi.string().external(checkMenuSet).required(),
    dinner: Joi.string().external(checkMenuSet).required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    var cekIfDietBelongsToUser = await Diet.findAll({
      where: { diet_maker: userdata.username, diet_id: id_diet },
    });
    if (cekIfDietBelongsToUser.length == 0) {
      return res.status(403).json("Unauthorized access");
    }

    let dietContent = [];
    let totalCalories = 0;
    let meal = [
      { time: "breakfast", id: breakfast },
      { time: "lunch", id: lunch },
      { time: "dinner", id: dinner },
    ];

    for (let j = 0; j < meal.length; j++) {
      let mealSet = await MenuSet.findByPk(meal[j].id);

      if (mealSet) {
        const menu = JSON.parse(mealSet.menu_content);
        const menuSet = menu.map((item) => item.menuName);
        const tempDiet = {
          id_menu_set: mealSet.menu_set_id,
          time: meal[j].time,
          menu_set: menuSet,
        };

        totalCalories += mealSet.menu_set_total_calories;
        dietContent.push(tempDiet);
      }
    }

    let newDiet = await Diet.update(
      {
        diet_content: JSON.stringify(dietContent),
        diet_total_calories: totalCalories,
      },
      {
        where: {
          diet_id: id_diet,
        },
      }
    );
    return res.status(200).send("Successfully updated");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

// =============================================================================

const getDiet = async (req, res) => {
  let { id_diet, nama_diet, min_calories, max_calories } = req.query;

  const schema = Joi.object({
    id_diet: Joi.string(),
    nama_diet: Joi.string(),
    min_calories: Joi.number().min(1).max(10000),
    max_calories: Joi.number().min(1).max(10000),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.query);
  } catch (error) {
    return res.status(403).send(error.toString());
  }

  let userdata = req.body.user;
  if (userdata.role != "consultant") {
    return res.status(403).json("Unauthorized access");
  }
  try {
    if (!(id_diet == "" || id_diet == undefined || id_diet == null)) {
      let set = await Diet.findAll({
        where: {
          diet_id: id_diet,
          diet_maker: userdata.username,
        },
      });
      if (set.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({
          id_diet: set[0].diet_id,
          nama_diet: set[0].diet_name,
          total_calories: set[0].diet_total_calories,
          diet_content: JSON.parse(set[0].diet_content),
        });
      }
    } else if (
      !(nama_diet == "" || nama_diet == undefined || nama_diet == null)
    ) {
      if (
        (max_calories == "" ||
          max_calories == undefined ||
          max_calories == null) &&
        (min_calories == "" ||
          min_calories == undefined ||
          min_calories == null)
      ) {
        let set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: nama_diet },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      } else if (
        max_calories == "" ||
        max_calories == undefined ||
        max_calories == null
      ) {
        let set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: nama_diet },
            diet_total_calories: { [Op.gte]: min_calories },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      } else if (
        min_calories == "" ||
        min_calories == undefined ||
        min_calories == null
      ) {
        let set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: nama_diet },
            diet_total_calories: { [Op.lte]: max_calories },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      } else {
        let set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: nama_diet },
            diet_total_calories: { [Op.gte]: min_calories },
            diet_total_calories: { [Op.lte]: max_calories },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      }
    } else if (
      !(min_calories == "" || min_calories == undefined || min_calories == null)
    ) {
      if (
        max_calories == "" ||
        max_calories == undefined ||
        max_calories == null
      ) {
        let set = await Diet.findAll({
          where: {
            diet_total_calories: { [Op.gte]: min_calories },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      } else {
        let set = await Diet.findAll({
          where: {
            diet_total_calories: { [Op.gte]: min_calories },
            diet_total_calories: { [Op.lte]: max_calories },
            diet_maker: userdata.username,
          },
        });
        let result = [];
        for (let i = 0; i < set.length; i++) {
          let tempResult = {
            id_diet: set[i].diet_id,
            nama_diet: set[i].diet_name,
            total_calories: set[i].diet_total_calories,
            diet_content: JSON.parse(set[i].diet_content),
          };
          result.push(tempResult);
        }
        if (result.length == 0) {
          return res
            .status(400)
            .json({ msg: "Oops it seems we didn't find anything" });
        } else {
          return res.status(200).json({ result });
        }
      }
    } else if (
      !(max_calories == "" || max_calories == undefined || max_calories == null)
    ) {
      let set = await Diet.findAll({
        where: {
          diet_total_calories: { [Op.lte]: max_calories },
          diet_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_diet: set[i].diet_id,
          nama_diet: set[i].diet_name,
          total_calories: set[i].diet_total_calories,
          diet_content: JSON.parse(set[i].diet_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    } else {
      let set = await Diet.findAll({
        where: {
          diet_maker: userdata.username,
        },
      });
      let result = [];
      for (let i = 0; i < set.length; i++) {
        let tempResult = {
          id_diet: set[i].diet_id,
          nama_diet: set[i].diet_name,
          total_calories: set[i].diet_total_calories,
          diet_content: JSON.parse(set[i].diet_content),
        };
        result.push(tempResult);
      }
      if (result.length == 0) {
        return res
          .status(400)
          .json({ msg: "Oops it seems we didn't find anything" });
      } else {
        return res.status(200).json({ result });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// =============================================================================

module.exports = {
  menuSet,
  diet,
  deleteMenu,
  deleteDiet,
  getMenu,
  getSet,
  updateDiet,
  updateSet,
  getDiet,
};
