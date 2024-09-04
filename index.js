// import  module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// use express module as app
const app = express();

const corsconfig = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsconfig));
// Middleware to parse JSON request bodies
app.use(express.json());

const login = require("./Controllers/loginAPI");
// login
app.use("/login", login);

require("dotenv").config();

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
