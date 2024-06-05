const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  trip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: ['Transportation', 'Accommodation', 'Food', 'Entertainment', 'Other'],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);