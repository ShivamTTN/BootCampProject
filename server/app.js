const express = require("express");
const mongoose = require("./database/connection");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const loginRouter = require("./routes/login");
const homeRouter = require("./routes/home");
const port = 8000;

var { passport } = require("./routes/PassportConfig/configuration");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

//MiddleWare

app.use(express.json());
// app.use(express.urlencoded(true))
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//Routes
app.use(loginRouter);
app.use(homeRouter);

app.listen(port, () => {
  console.log("Server at port : " + port);
});

module.exports = app;
