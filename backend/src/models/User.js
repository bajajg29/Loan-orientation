const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['CUSTOMER', 'OFFICER'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', User);
