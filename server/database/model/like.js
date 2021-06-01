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

},  { versionKey: false, timestamps: true });

const likeModel = mongoose.model("Like", likeSchema);

module.exports = {
  likeModel,
};
