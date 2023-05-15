const express = require("express");
const router = express.Router();
const {
  register,
  login,
  updateUserdata,
  updatePassword,
  topup,
  recharge,
  diet,
  calculateBMI,
  scheduleDiet,
  getSchedule,
  updateSchedule,
  getCalories
} = require("../controllers/user");

router.post("/register",register);
router.post("/login",login);
router.patch("/update/userdata",updateUserdata);
router.patch("/update/password",updatePassword);
router.post("/topup",topup);
router.post("/recharge",recharge);
router.get("/diet",diet);
router.get("/calculate_BMI",calculateBMI);
router.post("/schedule_diet",scheduleDiet);
router.get("/schedule_diet",getSchedule);
router.update("/schedule_diet",updateSchedule);
router.get("/calories_intake",getCalories);

module.exports = router;


