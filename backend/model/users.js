const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
//   isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
