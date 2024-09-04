const express = require("express");
const { User } = require("../Models/loginModel"); // Assuming your user model is in './models/user.js'

const router = express.Router();

router.use(express.json()); // To parse JSON request bodies

// POST route to create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
