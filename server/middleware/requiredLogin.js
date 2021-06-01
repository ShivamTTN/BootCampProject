const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../database/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  jwt.verify(authorization, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    const { id } = payload;
    // console.log(id)
    req.id = id;
    next();
  });

};
