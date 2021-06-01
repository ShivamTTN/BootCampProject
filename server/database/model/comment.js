const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: String,
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

commentSchema.post("update", function () {
  this.set({ updatedAt: Date.now() });
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = {
  commentModel,
};
