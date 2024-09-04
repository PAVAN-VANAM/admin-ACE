// import  module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const login = require("./Controllers/loginAPI");
// use express module as app
const app = express();
const register = require("./Controllers/RegisterAPI");
require("dotenv").config();

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// login
app.use("/login", login);

app.use("/register", register);

const PORT = process.env.PORT || 6000;
const DBURL = process.env.DB_URL;

const connect = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("Connected to MongoDataBase");
  } catch (err) {
    console.log("Error connecting" + err.message);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connect();
});
