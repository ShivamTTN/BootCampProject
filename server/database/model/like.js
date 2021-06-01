const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  status: {
    type: String,
    enum: ["like", "dislike"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

likeSchema.post("update", function () {
  this.set({ updatedAt: Date.now() });
});

const likeModel = mongoose.model("Like", likeSchema);

module.exports = {
  likeModel,
};
