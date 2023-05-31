const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: false,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },
    role: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },
    postgressql: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
