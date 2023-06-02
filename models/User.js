const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      min: 3,
      max: 20,
      unique: false,
    },
    email: {
      type: String,
      required: false,
      max: 50,
      unique: false,
    },
    role: {
      type: String,
      required: false,
      max: 50,
      unique: false,
    },
    postgressql: {
      type: String,
      required: false,
      max: 50,
      unique: false,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
