const express = require("express");
route = express.Router();

const auth = require('../../middleware/Auth')

const {
  home,
  loginHandler,
  loginPage,
  registerPage,
} = require("../Controllers/AuthController");


route.get("/", loginPage);

route.get("/home", auth,home);

route.get("/register", registerPage);

route.post("login/verify", loginHandler);

module.exports = route;
