const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  source: String,
  currency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
  description: String,
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Income', incomeSchema);
