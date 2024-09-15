// import  module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./Models/loginModel");
// use express module as app
const app = express();
require("dotenv").config();

app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;
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

app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ msg: "No email " });
    return;
  }
  try {
    // Use lean() for faster retrieval without creating full Mongoose documents
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (password != user.password) {
      // Simple password comparison, consider using bcrypt for production
      return res.status(200).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    /* const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    ); */

    // Respond with the token, name, and department
    res.status(200).json({
      msg: "Authentication Successful",
      name: user.name,
      department: user.department,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
