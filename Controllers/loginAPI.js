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

module.exports = router;
