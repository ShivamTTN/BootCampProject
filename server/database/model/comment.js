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
},  { versionKey: false, timestamps: true });



const commentModel = mongoose.model("Comment", commentSchema);

module.exports = {
  commentModel,
};
