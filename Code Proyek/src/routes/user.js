const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.patch("/update/userdata", updateUserData);
router.patch("/update/password", updatePassword);
router.patch("/topup", topup);
router.patch("/recharge", recharge);
router.get("/diet", diet);
router.get("/calculate_BMI", calculateBMI);
router.post("/schedule_diet", scheduleDiet);
router.get("/schedule_diet", getSchedule);
router.put("/schedule_diet", updateSchedule);
router.get("/calories_intake", getCalories);

module.exports = router;
