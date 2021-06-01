const { userModel } = require("../model/user");
const { friendModel } = require("../model/friend");

module.exports.getUserData = async ({ id, query }) => {
  let data = null;
  // console.log(body)
  try {
    if (query.personId) {
      let userData = await userModel.findOne({ _id: query.personId });
      let friendData = await friendModel
        .findOne({ user: query.personId }, { friends: 1 })
      let friendCountFromDb = friendData.friends.length
      let checkIfFriends = await friendModel.findOne(
        { user: query.personId, friends: { $in: id } },
        { friends: 1 }
      );
      // console.log(checkIfFriends)
      let newObj = null;
      if (checkIfFriends) {
        newObj = {
          ...userData.toJSON(),
          friendCount: friendCountFromDb,
          alreadyFriends: true,
        };
      } else {
        newObj = {
          ...userData.toJSON(),
          friendCount: friendCountFromDb,
          alreadyFriends: false,
        };
      }
      // newObj = {
      //   ...userData.toJSON(),
      //   friendCount : friendData
      // }
      data = newObj;
      // console.log(data)
    } else {
      data = await userModel.findOne({ _id: id });
      // console.log(data)
    }
    // throw err;
    return data;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

module.exports.updateUserData = async ({ id, body }) => {
  try {
    let updateUserData = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        firstname: body.userObj.firstname,
        lastname: body.userObj.lastname,
        profileImage: body.userObj.personalImage,
        desig: body.userObj.desig,
        website: body.userObj.website,
        gender: body.userObj.gender,
        dob: body.userObj.birthDate,
        city: body.userObj.city,
        state: body.userObj.state,
        zip: body.userObj.zip,
      }
    );
    let newUserData = await userModel.findOne({
      _id: id,
    });
    // console.log(newUserData)
    return newUserData;
  } catch (err) {
    throw err;
  }
};
