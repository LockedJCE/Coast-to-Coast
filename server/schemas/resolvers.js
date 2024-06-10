const { AuthenticationError, signToken } = require('../utils/auth');
const { User, Trip, Itinerary, Activity, Expense } = require('../models');


const resolvers = {
  Query: {
    me: async (_,__, context) => {
      if (context.user)
        return await User.findById(context.user._id)
      throw AuthenticationError
    },
    users: async (_, __, context) => {
      if (context.user)
        return await User.find({})
      throw AuthenticationError
    },
    user: async (_, { id }, context) => {
      if (context.user)
        return await User.findById(id)
      throw AuthenticationError
    },
    trips: async (_, __, context) => {
      if (context.user)
        return await Trip.find({})
      throw AuthenticationError
    },
    trip: async (_, { id }, context) => {
      if (context.user)
        return await Trip.findById(id)
      throw AuthenticationError
    },
    itineraries: async (_, { tripId }, context) => {
      if (context.user)
        return await Itinerary.find({ trip: tripId })
      throw AuthenticationError
    },
    itinerary: async (_, { id }, context) => {
      if (context.user)
        return await Itinerary.findById(id)
      throw AuthenticationError
    },
    activities: async (_, { itineraryId }, context) => {
      if (context.user)
        return await Activity.find({ itinerary: itineraryId })
      throw AuthenticationError
    },
    activity: async (_, { id }, context) => {
      if (context.user)
        return await Activity.findById(id)
      throw AuthenticationError

    },
    expenses: async (_, { tripId }, context) => {
      if (context.user)
        return await Expense.find({ trip: tripId })
      throw AuthenticationError
    },
    expense: async (_, { id }, context) => {
      if (context.user)
        return await Expense.findById(id)
      throw AuthenticationError
    },
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (_, { userId, title, description, startDate, endDate }, context) => {
      if (context.user) {
        const trip = await Trip.create({ title, description, startDate, endDate, user: userId });
        await User.findByIdAndUpdate(userId, { $push: { trips: trip.id } });
        return trip
      };
      throw AuthenticationError
    },
    addItinerary: async (_, { tripId, date }, context) => {
      if (context.user) {
        const itinerary = await Itinerary.create({ trip: tripId, date });
        await Trip.findByIdAndUpdate(tripId, { $push: { itineraries: itinerary.id } });
        return itinerary
      };
      throw AuthenticationError
    },
    addActivity: async (_, { itineraryId, title, description, location, startTime, endTime }, context) => {
      if (context.user) {
        const activity = await Activity.create({ itinerary: itineraryId, title, description, location, startTime, endTime });
        await Itinerary.findByIdAndUpdate(itineraryId, { $push: { activities: activity.id } });
        return activity
      };
      throw AuthenticationError
    },
    addExpense: async (_, { tripId, description, amount, date, category }, context) => {
      if (context.user) {
        const expense = await Expense.create({ trip: tripId, description, amount, date, category });
        await Trip.findByIdAndUpdate(tripId, { $push: { expenses: expense.id } });
        return expense
      };
      throw AuthenticationError
    },
  },
};

module.exports = resolvers;