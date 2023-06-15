const { User } = require("../models");
var jwt = require('jsonwebtoken');
const JWT_KEY = 'KimJisoo';

const middleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!req.header('x-auth-token')) {
      return res.status(400).json("Please Insert Token");
    }

    let tokenData = undefined;
    try{
      tokenData = jwt.verify(token, JWT_KEY);
    }catch(error){
      console.log(error)
      res.status(401).send("Invalid JWT Token")
    }
    const user = await User.findByPk(tokenData.username);
    req.body.user = user;
    next();
  };

module.exports = middleware