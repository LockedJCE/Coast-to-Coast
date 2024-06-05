const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  itinerary: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerary',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  expense: {
    type: Schema.Types.ObjectId,
    ref: 'Expense',
  },
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);