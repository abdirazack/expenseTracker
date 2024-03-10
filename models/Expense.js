const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  payment_method_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' },
  currency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },
  description: String,
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);
