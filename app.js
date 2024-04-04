//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://127.0.0.1/userDB");
const userSchema = {
  firstName: String,
  surname: String,
  phone: Number,
  email: String,
  password: String,
};
const User = new mongoose.model("User", userSchema);
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/register", function (req, res) {
  res.render("register");
});
app.post("/register", function (req, res) {
  const newUser = new User({
    firstName: req.body.firstname,
    surname: req.body.surname,
    phone: req.body.phone,
    email: req.body.username,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      res.render("saved");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
