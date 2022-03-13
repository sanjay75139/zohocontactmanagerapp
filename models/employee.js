const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employeeScheme = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },

  contact: {
    type: Number,
    required: true,
    unique: true,
    min: 1e9,
    max: 1e10 - 1,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Employee", employeeScheme);
