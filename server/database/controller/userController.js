const userSevice = require("../service/userService");

module.exports.getUserData = async (req, res) => {
  try {
    const response = await userSevice.getUserData(req);
    return res.status(200).json(response);
  } catch (err) {
    // console.log("hehe")
    return res.status(500).json({ error: "Error Getting User Data" });
  }
};

module.exports.updateUserData = async (req, res) => {
  try {
    const response = await userSevice.updateUserData(req);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Updating User Data" });
  }
};
