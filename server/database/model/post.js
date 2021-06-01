const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: [
      {
        type: String,
      },
    ],

    caption: {
      type: String,
      default: "",
    },

    reportCount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);


const postModel = mongoose.model("Post", postSchema);

module.exports = {
  postModel,
};
