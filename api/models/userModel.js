const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String
    },
    about: {
      type: String
    },
    livesIn: {
      type: String
    },
    worksAt: {
      type: String
    },
    country: {
      type: String
    },
    relationship: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);