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
        callback(null, req.body.username + ".jpg"); 
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
  buyDiet,
  getRechargeHistory,
  getTransactionHistory,
  userInformation,
  getTopupHistory,
  getProfpic,
} = require("../controllers/user");

const middleware = require('../middlleware/middlleware');

router.post("/register", upd.single('photoprofile'),  register);
router.post("/login", login);
router.patch("/update/userdata", [middleware], updateUserData);
router.patch("/update/password", [middleware], updatePassword);
router.patch("/topup", [middleware], topup);
router.patch("/recharge", [middleware], recharge);
router.get("/diet", [middleware], diet);
router.post("/buy/diet", [middleware], buyDiet);
router.get("/recharge_history", [middleware], getRechargeHistory);
router.get("/transaction_history", [middleware], getTransactionHistory);
router.get("/userinfo", [middleware],userInformation );
router.get("/topup_history", [middleware], getTopupHistory);
router.get("/profile_picture", [middleware], getProfpic)

module.exports = router;