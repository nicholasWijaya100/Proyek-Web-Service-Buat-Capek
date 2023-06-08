const express = require("express");
const router = express.Router();
const multer = require('multer');
app = express();
app.use(express.static("uploads"));
var mystorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './src/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname); 
    }
});
var upd = multer({ 
    storage: mystorage
});

const {
  register,
  login,
  updateUserData,
  updatePassword,
  topup,
  recharge,
  diet,
  getRechargeHistory,
  scheduleDiet,
  getTransactionHistory,
  updateSchedule,
  getTopupHistory,
} = require("../controllers/user");

router.post("/register", upd.single('photoprofile'),  register);
router.post("/login", login);
router.patch("/update/userdata", updateUserData);
router.patch("/update/password", updatePassword);
router.patch("/topup", topup);
router.patch("/recharge", recharge);
router.get("/diet", diet);
router.get("/recharge_history", getRechargeHistory);
router.post("/schedule_diet", scheduleDiet);
router.get("/transaction_history", getTransactionHistory);
router.put("/schedule_diet", updateSchedule);
router.get("/topup_history", getTopupHistory);

module.exports = router;