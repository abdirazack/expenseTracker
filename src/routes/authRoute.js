const express = require("express");
route = express.Router();

const {
  loginHandler,
  loginPage,
  registerPage,
} = require("../Controllers/AuthController");


route.get("/", loginPage);

route.get("/register", registerPage);

route.post("login/verify", loginHandler);

module.exports = route;
