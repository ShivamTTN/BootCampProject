const GoogleLoginService = require("../service/googleLoginService");
// const cookies = require("cookies");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../keys");

module.exports.googleLogin = async (req, res) => {
  try {
    const response = await GoogleLoginService.login(req.user);
    // console.log(response);
    const user = {
      id: response._id,
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: 5000 });
    // console.log(token)
    if (token) {
      res.cookie("token", token, {
        maxAge: 800000,
      });
      res.redirect("/success");
      // .writeHead(200, {
      //   "Set-Cookie": `token=${token}; HttpOnly`,
      //   "Access-Control-Allow-Credentials": "true",
      // })
    } else {
      res.status(401).send();
    }
  } catch (err) {return res.status(500).json({ error: "Error In Logging" });}
};
