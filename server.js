const express = require("express");
const dotenv = require("dotenv");
dotenv.config();


const path = require("path");

const connectToDatabase = require('./config/db')

const ejs = require("ejs");

dotenv.config();

const app = express();

connectToDatabase();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "src", "views"));

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.get("/", (req, res) => {
  res.render("auth/register");
});
