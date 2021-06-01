const { userModel } = require("../model/user");
const { friendModel } = require("../model/friend");
module.exports.login = async ({
  given_name,
  family_name,
  picture,
  email,
  hd,
}) => {
  try {
    //   console.log(user);
    let user = null;
    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      user = checkUser;
    } else {
      user = await userModel.create({
        firstname: given_name,
        lastname: family_name,
        profileImage: picture,
        email: email,
        role: "user",
      });
      friend = await friendModel.create({
        user: user._id,
      });
    }

    return user;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};
