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
  getTransactionHistory,
  updateSchedule,
  getTopupHistory,
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
router.get("/transaction_history", getTransactionHistory);
router.put("/schedule_diet", updateSchedule);
router.get("/topup_history", getTopupHistory);

module.exports = router;
