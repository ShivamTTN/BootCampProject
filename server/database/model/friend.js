const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  received: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const friendModel = mongoose.model("Friend", friendSchema);

module.exports = {
  friendModel,
};
