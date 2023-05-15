
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// Require
const user = require('./src/routes/user');
const admin = require('./src/routes/admin');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/v1/user",user);
app.use("/v1/admin",admin);