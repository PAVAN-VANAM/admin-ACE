const { User } = require("../Models/login.js");
const express = require("express");
const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

router.use(express.json());

router.use(timeLog);

// Login endpoint
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (password == user.password) {
      // Simple password comparison, consider using bcrypt for production
      return res.status(200).json({ msg: "valid credentials" });
    }

    /* // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token, name, and department
    res.status(200).json({
      msg: "Authentication Successful",
      //token,
      name: user.name,
      department: user.department,
    }); */
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
