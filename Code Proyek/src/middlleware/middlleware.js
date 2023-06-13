const { User } = require("../models");

const middleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    let tokenData = undefined;
    try{
      tokenData = jwt.verify(token, JWT_KEY);
    }catch(error){
      res.status(401).send("Invalid JWT TOken")
    }
    const user = User.findByPk(tokenData.username);
    req.body.user = user;
    next();
  };

module.exports = middleware