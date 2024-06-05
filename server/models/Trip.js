const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  itineraries: [{
    type: Schema.Types.ObjectId,
    ref: 'Itinerary',
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);