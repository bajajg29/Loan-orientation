const mongoose = require('mongoose');
const { Schema } = mongoose;

const Customer = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  income: { type: Number, default: 0 },
  creditScore: { type: Number, default: 600 }
});

module.exports = mongoose.model('Customer', Customer);
