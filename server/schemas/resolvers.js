const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Itinerary, Activity, Expense } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'trips',
          populate: [
            {
              path: 'user',
              select: 'username',
            },
            {
              path: 'itineraries',
              populate: {
                path: 'activities',
                populate: {
                  path: 'expense',
                },
              },
            },
            {
              path: 'expenses',
            },
          ],
        });
        console.log('User fetched:', user);
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async (_, __, context) => {
      if (context.user) {
        return await User.find({}).populate({
          path: 'trips',
          populate: [
            {
              path: 'itineraries',
              populate: {
                path: 'activities',
                populate: {
                  path: 'expense',
                },
              },
            },
            {
              path: 'expenses',
            },
          ],
        });
      }
      throw new AuthenticationError('Not logged in');
    },
    user: async (_, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username }).populate({
          path: 'trips',
          populate: [
            {
              path: 'itineraries',
              populate: {
                path: 'activities',
                populate: {
                  path: 'expense',
                },
              },
            },
            {
              path: 'expenses',
            },
          ],
        });
      }
      throw new AuthenticationError('Not logged in');
    },
    trips: async (_, __, context) => {
      if (context.user) {
        return await Trip.find({}).populate([
          {
            path: 'user',
            select: 'username',
          },
          {
            path: 'itineraries',
            populate: {
              path: 'activities',
              populate: {
                path: 'expense',
              },
            },
          },
          {
            path: 'expenses',
          },
        ]);
      }
      throw new AuthenticationError('Not logged in');
    },
    trip: async (_, { tripId }, context) => {
      if (context.user) {
        const trip = await Trip.findById(tripId).populate([
          {
            path: 'user',
            select: 'username',
          },
          {
            path: 'itineraries',
            populate: {
              path: 'activities',
              populate: {
                path: 'expense',
              },
            },
          },
          {
            path: 'expenses',
          },
        ]);
        console.log('Trip fetched:', trip);
        return trip;
      }
      throw new AuthenticationError('Not logged in');
    },
    itineraries: async (_, { tripId }, context) => {
      if (context.user) {
        const itineraries = await Itinerary.find({ trip: tripId }).populate('activities');
        console.log('Itineraries fetched:', itineraries);
        return itineraries;
      }
      throw new AuthenticationError('Not logged in');
    },
    itinerary: async (_, { id }, context) => {
      if (context.user) {
        const itinerary = await Itinerary.findById(id).populate('activities');
        console.log('Itinerary fetched:', itinerary);
        return itinerary;
      }
      throw new AuthenticationError('Not logged in');
    },
    activities: async (_, { itineraryId }, context) => {
      if (context.user) {
        const activities = await Activity.find({ itinerary: itineraryId }).populate('expense');
        console.log('Activities fetched:', activities);
        return activities;
      }
      throw new AuthenticationError('Not logged in');
    },
    activity: async (_, { id }, context) => {
      if (context.user) {
        const activity = await Activity.findById(id).populate('expense');
        console.log('Activity fetched:', activity);
        return activity;
      }
      throw new AuthenticationError('Not logged in');
    },
    expenses: async (_, { tripId }, context) => {
      if (context.user) {
        return await Expense.find({ trip: tripId });
      }
      throw new AuthenticationError('Not logged in');
    },
    expense: async (_, { id }, context) => {
      if (context.user) {
        return await Expense.findById(id);
      }
      throw new AuthenticationError('Not logged in');
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
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addTrip: async (_, { userId, title, description, startDate, endDate }, context) => {
      if (context.user) {
        const trip = await Trip.create({ title, description, startDate, endDate, user: userId });
        await User.findByIdAndUpdate(userId, { $push: { trips: trip._id } });
        return trip;
      }
      throw new AuthenticationError('Not logged in');
    },
    addItinerary: async (_, { tripId, date }, context) => {
      if (context.user) {
        const itinerary = await Itinerary.create({ trip: tripId, date });
        await Trip.findByIdAndUpdate(tripId, { $push: { itineraries: itinerary._id } });
        return itinerary;
      }
      throw new AuthenticationError('Not logged in');
    },
    addActivity: async (_, { itineraryId, title, description, location, startTime, endTime }, context) => {
      if (context.user) {
        const activity = await Activity.create({ itinerary: itineraryId, title, description, location, startTime, endTime });
        await Itinerary.findByIdAndUpdate(itineraryId, { $push: { activities: activity._id } });
        return activity;
      }
      throw new AuthenticationError('Not logged in');
    },
    addExpense: async (_, { tripId, description, amount, date, category }, context) => {
      if (context.user) {
        const expense = await Expense.create({ trip: tripId, description, amount, date, category });
        await Trip.findByIdAndUpdate(tripId, { $push: { expenses: expense._id } });
        return expense;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;