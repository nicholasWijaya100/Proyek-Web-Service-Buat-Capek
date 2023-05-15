// Require
const express = require("express");
const admin = require('./src/routes/admin');
const user = require('./src/routes/user');

app.use("v1/admin",admin);
app.use("v1/user",user);