const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Itinerary, Activity, Expense } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { id }) => await User.findById(id),
    trips: async () => await Trip.find({}),
    trip: async (_, { id }) => await Trip.findById(id),
    itineraries: async (_, { tripId }) => await Itinerary.find({ trip: tripId }),
    itinerary: async (_, { id }) => await Itinerary.findById(id),
    activities: async (_, { itineraryId }) => await Activity.find({ itinerary: itineraryId }),
    activity: async (_, { id }) => await Activity.findById(id),
    expenses: async (_, { tripId }) => await Expense.find({ trip: tripId }),
    expense: async (_, { id }) => await Expense.findById(id),
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (_, { userId, title, description, startDate, endDate }) => {
      const trip = await Trip.create({ title, description, startDate, endDate, user: userId });
      await User.findByIdAndUpdate(userId, { $push: { trips: trip.id } });
      return trip;
    },
    addItinerary: async (_, { tripId, date }) => {
      const itinerary = await Itinerary.create({ trip: tripId, date });
      await Trip.findByIdAndUpdate(tripId, { $push: { itineraries: itinerary.id } });
      return itinerary;
    },
    addActivity: async (_, { itineraryId, title, description, location, startTime, endTime }) => {
      const activity = await Activity.create({ itinerary: itineraryId, title, description, location, startTime, endTime });
      await Itinerary.findByIdAndUpdate(itineraryId, { $push: { activities: activity.id } });
      return activity;
    },
    addExpense: async (_, { tripId, description, amount, date, category }) => {
      const expense = await Expense.create({ trip: tripId, description, amount, date, category });
      await Trip.findByIdAndUpdate(tripId, { $push: { expenses: expense.id } });
      return expense;
    },
  },
};

module.exports = resolvers;