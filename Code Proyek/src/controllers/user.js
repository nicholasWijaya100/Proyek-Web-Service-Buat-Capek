const Joi = require("joi").extend(require("@joi/date"));
var jwt = require("jsonwebtoken");
const sequelize = require("../databases/conn");
const mod_users = require("../models/user");
const {
  User,
  MenuSet,
  Diet,
  TopupHistory,
  HistoryTransaction,
  RechargeHistory,
} = require("../models");
const { useInflection } = require("sequelize");
const { where } = require("sequelize");
const { Op } = require("sequelize");
const JWT_KEY = "KimJisoo";

async function checkDietById(id) {
  if (id == undefined || id == "" || id == null) {
    return true;
  } else {
    let set = await Diet.findOne({
      where: {
        diet_id: id,
      },
    });
    if (set == null) throw new Error("diet not found, invalid diet id");
    else return true;
  }
}

async function checkDietByName(name) {
  if (name == undefined || name == "" || name == null) {
    return true;
  } else {
    let set = await Diet.findOne({
      where: {
        diet_name: name,
      },
    });
    if (set == null) throw new Error("diet not found, invalid diet name");
    else return true;
  }
}

const register = async (req, res) => {
  var cek = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid("FEMALE", "MALE").required(),
    birth_date: Joi.date().format("DD/MM/YYYY"),
    body_weight: Joi.number().required(),
    body_height: Joi.number().required(),
    target_weight: Joi.string().required(),
    role: Joi.string().valid("user", "consultant").required(),
    photoprofile: Joi.string(),
  });
  try {
    await cek.validateAsync(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var gender = req.body.gender;
    var birth_date = req.body.birth_date;
    var body_weight = req.body.body_weight;
    var body_height = req.body.body_height;
    var target_weight = req.body.target_weight;
    var role = req.body.role;
    var profile_picture = req.file.filename;

    var arrbirth = birth_date.split("/");
    birth_date = arrbirth[2] + "-" + arrbirth[1] + "-" + arrbirth[0];

    var cekuser = await User.findAll({ where: { username: username } });

    if (cekuser.length == 0) {
      if (gender == "FEMALE" || gender == "MALE") {
        var alphabet =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var api = "";
        for (var i = 0; i < 10; i++) {
          var acak = Math.floor(Math.random() * 62);
          var hrf = alphabet.substr(acak, 1);
          api = api + hrf;
        }
        var api_hit = 0;
        var saldo = 0;
        var userbaru = User.build({
          username: username,
          password: password,
          gender: gender,
          birth_date: birth_date,
          body_weight: body_weight,
          body_height: body_height,
          target_weight: target_weight,
          role: role,
          saldo: saldo,
          api_hit: api_hit,
          api_key: api,
          profile_picture: profile_picture,
        });
        await userbaru.save();

        return res.status(201).json({
          message: "User created successfully.",
          data: userbaru,
        });
      } else {
        return res.status(400).send({ msg: "Gender harus MALE atau FEMALE" });
      }
    } else {
      return res.status(400).send({ msg: "Akun Sudah Terdaftar" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  var cek = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await cek.validateAsync(req.body);

    var username = req.body.username;
    var password = req.body.password;

    var cekuser = await User.findAll({ where: { username: username } });

    if (cekuser.length > 0) {
      if (username == cekuser[0].username && password == cekuser[0].password) {
        try {
          let token = jwt.sign(
            {
              username: username,
              role: cekuser[0].role,
            },
            JWT_KEY,
            { expiresIn: "7000s" }
          );

          return res.status(200).json({
            username: cekuser[0].username,
            password: cekuser[0].password,
            body_height: cekuser[0].body_height,
            body_weight: cekuser[0].body_weight,
            target_weight: cekuser[0].target_weight,
            birth_date: cekuser[0].birth_date,
            token: token,
          });
        } catch (error) {
          return res.status(400).json("Error: " + error);
        }
      } else {
        return res.status(400).send({ msg: "Username atau Password salah" });
      }
    } else {
      return res.status(400).send({ msg: "Akun Tidak Terdaftar" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updateUserData = async (req, res) => {
  var cek = Joi.object({
    body_weight: Joi.number(),
    body_height: Joi.number(),
    target_weight: Joi.number(),
  }).options({ stripUnknown: true });
  try {
    await cek.validateAsync(req.body);

    var body_weight = req.body.body_weight;
    var body_height = req.body.body_height;
    var target_weight = req.body.target_weight;
    var userdata = req.body.user;
    if (body_weight != "") {
      User.update(
        { body_weight: req.body.body_weight },
        { where: { username: userdata.username } }
      );
    }
    if (body_height != "") {
      User.update(
        { body_height: req.body.body_height },
        { where: { username: userdata.username } }
      );
    }
    if (target_weight != "") {
      User.update(
        { target_weight: req.body.target_weight },
        { where: { username: userdata.username } }
      );
    }
    return res.status(200).json("Berhasil Update data");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const updatePassword = async (req, res) => {
  var new_password = req.body.new_password;
  var confirm_new_password = req.body.confirm_new_password;

  var cek = Joi.object({
    new_password: Joi.string().required(),
    confirm_new_password: Joi.ref("new_password"),
  }).options({ stripUnknown: true });
  try {
    await cek.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }

  User.update(
    { password: new_password },
    { where: { username: req.body.user.username } }
  );

  res.status(200).send({ msg: "Password succesfully updated" });
};

const topup = async (req, res) => {
  var cek = Joi.object({
    topup: Joi.number().min(10000).required(),
  }).options({ stripUnknown: true });
  try {
    await cek.validateAsync(req.body);
    var topup = req.body.topup;
    var userdata = req.body.user;
    try {
      var cekuser = await User.findAll({
        where: { username: userdata.username },
      });
      if (cekuser.length <= 0) {
        res.status(400).send({ msg: "User not registered in database" });
      } else if (topup <= 0) {
        res.status(400).send({ msg: "Minimal topup must be at least $1" });
      } else {
        User.update(
          { saldo: parseInt(cekuser[0].saldo) + parseInt(req.body.topup) },
          { where: { username: userdata.username } }
        );

        var topuphistorybaru = TopupHistory.build({
          username: userdata.username,
          amount: topup,
        });
        await topuphistorybaru.save();

        return res.status(200).json({
          username: userdata.username,
          saldo: parseInt(cekuser[0].saldo) + parseInt(req.body.topup),
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const recharge = async (req, res) => {
  var cek = Joi.object({
    recharge: Joi.number().min(1).required(),
  }).options({ stripUnknown: true });
  try {
    await cek.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }

  var recharge = req.body.recharge;
  var userdata = req.body.user;

  try {
    var cekuser = await User.findAll({
      where: { username: userdata.username },
    });
    if (cekuser.length <= 0) {
      res.status(400).json({ msg: "User not registered in database" });
    } else if (recharge > cekuser[0].saldo) {
      res.status(400).json({ msg: "Insufficient account balance" });
    } else {
      var biaya = recharge * 10000;
      var sisa_saldo = cekuser[0].saldo - biaya;
      User.update(
        {
          api_hit: parseInt(cekuser[0].api_hit) + parseInt(req.body.recharge),
          saldo: sisa_saldo,
        },
        { where: { username: userdata.username } }
      );

      var rechargehistorybaru = RechargeHistory.build({
        username: userdata.username,
        cash_used: biaya,
        exchanged_hits: recharge,
      });
      await rechargehistorybaru.save();

      return res.status(200).json({
        username: userdata.username,
        sisa_saldo: sisa_saldo,
        biaya: biaya,
        kuota: parseInt(cekuser[0].api_hit) + parseInt(req.body.recharge),
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const getTopupHistory = async (req, res) => {
  let userdata = req.body.user;
  try {
    var user = await User.findAll({ where: { username: userdata.username } });
    var userTopupHistory = await TopupHistory.findAll({
      where: { username: userdata.username },
    });
    var output = [];
    for (var i = 0; i < userTopupHistory.length; i++) {
      output.push({
        amount: userTopupHistory[i].amount,
        topup_at: userTopupHistory[i].createdAt,
      });
    }
    return res.status(200).json(output);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const getRechargeHistory = async (req, res) => {
  let userdata = req.body.user;
  try {
    var user = await User.findAll({ where: { username: userdata.username } });
    if (user.length == 0) {
      res.status(400).json({ msg: "User not registered in database" });
    } else {
      var userRechargeHistory = await RechargeHistory.findAll({
        where: { username: userdata.username },
      });
      var output = [];
      for (var i = 0; i < userRechargeHistory.length; i++) {
        output.push({
          cost_of_recharge: userRechargeHistory[i].cash_used,
          api_hits_exchanged: userRechargeHistory[i].exchanged_hits,
          recharged_at: userRechargeHistory[i].createdAt,
        });
      }
      return res.status(200).json(output);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const diet = async (req, res) => {
  let userdata = req.body.user;
  try {
    let { id_diet, nama_diet } = req.query;

    const schema = Joi.object({
      id_diet: Joi.string(),
      nama_diet: Joi.string(),
    }).options({ stripUnknown: true });

    try {
      await schema.validateAsync(req.query);
    } catch (error) {
      return res.status(403).send(error.toString());
    }

    var currentDate = new Date();
    const calorie_to_maintain_weight =
      userdata.body_weight * 10 +
      userdata.body_height * 6.25 -
      5 * (currentDate.getFullYear() - userdata.birth_date.getFullYear());
    if (id_diet == undefined && nama_diet == undefined) {
      let set = "";
      if (userdata.target_weight > userdata.body_weight) {
        set = await Diet.findAll({
          where: {
            diet_total_calories: { [Op.gte]: calorie_to_maintain_weight },
          },
        });
      } else {
        set = await Diet.findAll({
          where: {
            diet_total_calories: { [Op.lte]: calorie_to_maintain_weight },
          },
        });
      }
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
    } else if (id_diet != undefined) {
      let set = await Diet.findAll({
        where: {
          diet_id: id_diet,
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
    } else if (nama_diet != undefined) {
      let set = "";
      if (userdata.target_weight > userdata.body_weight) {
        set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: `%${nama_diet}%` },
            diet_total_calories: { [Op.gte]: calorie_to_maintain_weight },
          },
        });
      } else {
        set = await Diet.findAll({
          where: {
            diet_name: { [Op.like]: `%${nama_diet}%` },
            diet_total_calories: { [Op.lte]: calorie_to_maintain_weight },
          },
        });
      }
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
    return res.status(500).json(error.message);
  }
};

async function checkUserHasEnoughMoneyAndDietId(id_diet, helpers, username) {
  let diet = await Diet.findOne({
    where: {
      diet_id: id_diet,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  let user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (diet == null) throw new Error("diet not found");
  else if (user.saldo < diet.diet_price + 2000)
    throw new Error("User does not have enough money to buy diet");
  else return true;
}

const buyDiet = async (req, res) => {
  let id_diet = req.body.id_diet;
  let userdata = req.body.user;
  const adminFee = 2000;

  const schema = Joi.object({
    id_diet: Joi.string()
      .external((value, helpers) => {
        return checkUserHasEnoughMoneyAndDietId(
          value,
          helpers,
          userdata.username
        );
      })
      .required(),
  }).options({ stripUnknown: true });

  try {
    await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).send(error.toString());
  }

  let boughtDiet = await Diet.findOne({
    where: {
      diet_id: id_diet,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  User.update(
    {
      saldo:
        parseInt(userdata.saldo) - parseInt(boughtDiet.diet_price) - adminFee,
    },
    { where: { username: userdata.username } }
  );

  var transkasibaru = HistoryTransaction.build({
    username: userdata.username,
    diet_id: id_diet,
    total_cost: parseInt(boughtDiet.diet_price) + adminFee,
  });
  await transkasibaru.save();

  res.status(201).json("Transaction Successful");
};

const getTransactionHistory = async (req, res) => {
  var userdata = req.body.user;
  var username = userdata.username;
  var transaction = [];

  var hasil = await HistoryTransaction.findAll({
    where: {
      username: username,
    },
  });

  if (hasil.length > 0) {
    for (var i = 0; i < hasil.length; i++) {
      // Temp Variables
      var diet_id = hasil[i].diet_id;
      var transaction_id = hasil[i].history_transaction_id;

      //Cek Diet name from temp variables
      var hasil_diet = await Diet.findAll({
        where: {
          diet_id: diet_id,
        },
      });
      var diet_name = hasil_diet[0].diet_name;
      var tempTrans = {
        transaction_id: transaction_id,
        diet_name: diet_name,
        price: hasil[i].total_cost,
      };

      transaction.push(tempTrans);
    }

    // Output
    res.status(200).send(transaction);
  } else {
    res.status(200).send("No transaction recorded!");
  }
};

const userInformation = async (req, res) => {
  var userdata = req.body.user;
  var username = userdata.username;
  var gender = userdata.gender;
  var birth_date = userdata.birth_date;
  var body_weight = userdata.body_weight;
  var body_height = userdata.body_height;
  var target_weight = userdata.target_weight;
  var role = userdata.role;
  var saldo = userdata.saldo;
  var api_hit = userdata.api_hit;
  const pengguna_nama = userdata.username;
  const lokasinya = `./src/uploads/${pengguna_nama}.jpg`;
  res
    .status(200)
    .json({
      Username: username,
      Gender: gender,
      "Birth Date": birth_date,
      Weight: body_weight,
      Height: body_height,
      "Target Weight": target_weight,
      Role: role,
      Saldo: saldo,
      "Api Hit": api_hit,
    })
    .sendFile(lokasinya, { root: "." });
};

const getProfpic = async (req, res) => {
  var token = req.header("x-auth-token");
  var userdata;
  if (!req.header("x-auth-token")) {
    res.status(400).json("Authentication token is missing");
  } else {
    try {
      userdata = jwt.verify(token, JWT_KEY);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.message);
    }
    const pengguna_nama = userdata.username;
    console.log(pengguna_nama);
    const lokasinya = `./src/uploads/${pengguna_nama}.jpg`;
    return res.status(200).sendFile(lokasinya, { root: "." });
  }
};

module.exports = {
  register,
  login,
  updateUserData,
  updatePassword,
  topup,
  recharge,
  diet,
  buyDiet,
  getRechargeHistory,
  getTransactionHistory,
  userInformation,
  getProfpic,
  getTopupHistory,
};
