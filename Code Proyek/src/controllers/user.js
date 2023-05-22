const Joi = require("joi").extend(require("@joi/date"));
const sequelize = require("../databases/conn");
const mod_users = require("../models/user");
const { User, MenuSet, Diet } = require("../models");

const register = async (req, res) => {
  var cek = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    gender: Joi.string().valid("FEMALE", "MALE").required(),
    birth_date: Joi.date().format("DD/MM/YYYY"),
    body_weight: Joi.string().required(),
    body_height: Joi.string().required(),
  });
  try {
    await cek.validateAsync(req.body);

    var username = req.body.username;
    var password = req.body.password;
    var gender = req.body.gender;
    var birth_date = req.body.birth_date;
    var body_weight = req.body.body_weight;
    var body_height = req.body.body_height;

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
          saldo: saldo,
          api_hit: api_hit,
          api_key: api,
        });
        await userbaru.save();

        res.json({
          message: "User created successfully.",
          data: userbaru,
        });
        //return res.status(200).json(birth_date);
      } else {
        res.status(400).send({ msg: "Gender harus MALE atau FEMALE" });
      }
    } else {
      res.status(400).send({ msg: "Akun Sudah Terdaftar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
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
      if (username == cekuser[0].username || password == cekuser[0].password) {
        return res.status(200).json({
          username: cekuser[0].username,
          password: cekuser[0].password,
          birth_date: cekuser[0].birth_date,
        });
      } else {
        res.status(400).send({ msg: "Username atau Password salah" });
      }
    } else {
      res.status(400).send({ msg: "Akun Tidak Terdaftar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const updateUserData = async (req, res) => {};

const updatePassword = async (req, res) => {};

const topup = async (req, res) => {};

const recharge = async (req, res) => {};

const diet = async (req, res) => {};

const calculateBMI = async (req, res) => {};

const scheduleDiet = async (req, res) => {};

const getSchedule = async (req, res) => {};

const updateSchedule = async (req, res) => {};

const getCalories = async (req, res) => {};

module.exports = {
  register,
  login,
  updateUserData,
  updatePassword,
  topup,
  recharge,
  diet,
  calculateBMI,
  scheduleDiet,
  getSchedule,
  updateSchedule,
  getCalories,
};
