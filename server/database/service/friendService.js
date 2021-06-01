const { userModel } = require("../model/user");
const { friendModel } = require("../model/friend");

module.exports.getConnectedFriends = async ({ id }) => {
  try {
    const connectedFriendData = await friendModel
      .findOne({ user: id }, { friends: 1, _id: 0 })
      .populate("friends", { firstname: 1, lastname: 1, profileImage: 1 });
    return connectedFriendData;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

module.exports.getReceivedFriendsCount = async ({ id }) => {
  try {
    const receivedFriendCount = await friendModel
      .findOne({ user: id }, { received: 1, _id: 0 })
      .populate("received", {
        _id: 1,
        firstname: 1,
        lastname: 1,
        profileImage: 1,
      });
    // console.log(receivedFriendCount)
    return receivedFriendCount;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

module.exports.getSuggesstions = async ({ id }) => {
  try {
    const getUserFriends = await friendModel.find(
      { user: id },
      { friends: 1, _id: 0 }
    );
    const getUserPendings = await friendModel.find(
      { user: id },
      { pending: 1, _id: 0 }
    );
    // console.log(getUserFriends)
    // console.log(getUserPendings)
    const subMainArr = getUserFriends[0].friends.concat(
      getUserPendings[0].pending
    );
    const mainArr = subMainArr.concat(id);
    // console.log(mainArr);
    // const getSuggesstionUserData = await userModel.find({_id:{$nin:getUserFriends.friends},_id:{$nin:getUserPendings.pending}},{firstname:1,lastname:1,profileImage:1});
    const getSuggesstionUserData = await userModel.find(
      { _id: { $nin: mainArr } },
      { firstname: 1, lastname: 1, profileImage: 1 }
    );
    return getSuggesstionUserData;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

module.exports.addFriend = async ({ id, body }) => {
  //   console.log(id + " " + query.friendId);
  try {
    const friendReceived = await friendModel.findOneAndUpdate(
      { user: body.friendId },
      { $push: { received: id } }
    );
    const personalPending = await friendModel.findOneAndUpdate(
      { user: id },
      { $push: { pending: body.friendId } }
    );
    //   console.log(newData);
    return personalPending;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

module.exports.confirmFriend = async ({ id, body }) => {
  try {
    console.log(body.friendId + " " + id);
    const friendPendingRemoveFriendAdd = await friendModel.findOneAndUpdate(
      { user: body.friendId },
      {
        $pull: { pending: id },
        $push: { friends: id },
      }
    );
    const personalReceivedRemoveFriendAdd = await friendModel.findOneAndUpdate(
      { user: id },
      {
        $pull: { received: body.friendId },
        $push: { friends: body.friendId },
      }
    );

    return personalReceivedRemoveFriendAdd;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};
module.exports.rejectFriend = async ({ id, body }) => {
  try {
    //   console.log(id + " " + query.friendId);
    const friendPendingRemove = await friendModel.findOneAndUpdate(
      { user: body.friendId },
      { $pull: { pending: id } }
    );
    const personalRequestedRemove = await friendModel.findOneAndUpdate(
      { user: id },
      { $pull: { received: body.friendId } }
    );
    //   console.log(newData);
    return personalRequestedRemove;
    //   return null;
  } catch (err) {
    // console.log(err)
    throw err;
  }
};
