const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "defaultProfile.png",
  },
  coverImage: {
    type: String,
    default: "defaultCover.png",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  desig: {
    type: String,
  },
  website: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dob: {
    type: Date,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },

},  { versionKey: false, timestamps: true });


const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
