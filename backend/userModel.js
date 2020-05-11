const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name:
  {
    type: String,
    unique: false,
    lowercase: true,
    required: [true, "An user must have a name"]
  },
  email:
  {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "An user must have an email"]
  },
  username:
  {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "An user must have a username"]
  },
  password:
  {
    type: String,
    required: [true, "An user must have a password"],
    select: false
  },
  cellphone:
  {
    type: Number,
    unique: false,
    lowercase: true,
    required: [false, "An user must have a cellphone"]
  },
  direction:
  {
    type: String,
    unique: false,
    lowercase: true,
    required: [false, "An user must have a direction"]
  },
  page:
  {
    type: String,
    unique: false,
    lowercase: true,
    required: [false, "An user must have a page"]
  },
  information:
  {
    type: String,
    unique: false,
    lowercase: true,
    required: [false, "An user must have information"]
  }
});

module.exports = mongoose.model("User", usersSchema);