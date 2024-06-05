const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  trip: {
    type: Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity',
  }],
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);