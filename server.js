const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.get("/", (req, res) => {
  res.render("home");
});
