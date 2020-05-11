const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({ 
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "An user must have a username"],
  },
  password: {
    type: String,
    required: [true, "An user must have a password"],
    select: false,
  }
});

module.exports = mongoose.model("User", usersSchema);