
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = 3000;

// Require
const user = require('./src/routes/user');
const admin = require('./src/routes/admin');
const conn = require("./src/databases/conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/v1/user",user);
app.use("/v1/admin",admin);

const initApp = async () => {
    console.log("Mencoba konek");
    try {
      await conn.authenticate();
      console.log("Berhasil konek");
      app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
      );
    } catch (error) {
      console.error("Gagal konek", error);
    }
  };
  
  initApp();
  