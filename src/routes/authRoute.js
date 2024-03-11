const express = require("express");
route = express.Router();

const {
  home,
  loginHandler,
  loginPage,
  registerPage,
} = require("../Controllers/AuthController");


route.get("/", loginPage);

route.get("/home", home);

route.get("/register", registerPage);

route.post("login/verify", loginHandler);

module.exports = route;
