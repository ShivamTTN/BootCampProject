const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleLoginController = require("../database/controller/googleLoginController");
const requiredLogin = require("../middleware/requiredLogin");

router.get("/login", requiredLogin, (req, res) => {
  res.send(req._id);
});

router.get("/fail", (req, res) => {
  //   console.log(res);
  // res.redirect("http://localhost:3000/home")
  res.redirect("http://localhost:3000/error")
});

router.get("/success", (req, res) => {
  res.redirect("http://localhost:3000/home");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res) => {
    const abc = googleLoginController.googleLogin(req, res);
    // console.log(abc);
  }
);

module.exports = router;
