const friendService = require("../service/friendService");

module.exports.getConnectedFriendsData = async (req, res) => {
  try {
    const response = await friendService.getConnectedFriends(req);
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error Getting Connected Friend Data" });
  }
};
module.exports.getReceivedFriendsCount = async (req, res) => {
  try {
    const response = await friendService.getReceivedFriendsCount(req);
    return res.status(200).json(response);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error Getting Received Friend Data" });
  }
};

module.exports.addFriend = async (req, res) => {
  try {
    const response = await friendService.addFriend(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Adding Friend" });
  }
};

module.exports.confirmFriend = async (req, res) => {
  try {
    const response = await friendService.confirmFriend(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Confirming Friend" });
  }
};

module.exports.rejectFriend = async (req, res) => {
  try {
    const response = await friendService.rejectFriend(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Rejecting Friend" });
  }
};

module.exports.getSuggesstions = async (req, res) => {
  try {
    const response = await friendService.getSuggesstions(req);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: "Error Getting Suggesstions" });
  }
};
