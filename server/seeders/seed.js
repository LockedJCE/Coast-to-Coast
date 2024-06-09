const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Trip, Itinerary, Activity, Expense } = require('../models');

dotenv.config();

const db = require('../config/connection');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Trip.deleteMany({});
    await Itinerary.deleteMany({});
    await Activity.deleteMany({});
    await Expense.deleteMany({});

    // Create Users
    const users = await User.insertMany([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123', // Not hashed
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123', // Not hashed
      },
    ]);

    // Create trips, itineraries, activities, and expenses
    const createTripsForUser = async (user) => {
      const trips = await Trip.insertMany([
        {
          user: user._id,
          title: 'Trip to New York',
          description: 'A fun trip to New York City.',
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-07-07'),
        },
        {
          user: user._id,
          title: 'Trip to Paris',
          description: 'A romantic trip to Paris.',
          startDate: new Date('2024-07-15'),
          endDate: new Date('2024-07-22'),
        },
      ]);

      // Update user's trips array
      await User.findByIdAndUpdate(user._id, { $push: { trips: { $each: trips.map(trip => trip._id) } } });

      for (const trip of trips) {
        const itineraries = await Itinerary.insertMany([
          {
            trip: trip._id,
            date: new Date(trip.startDate),
          },
          {
            trip: trip._id,
            date: new Date(new Date(trip.startDate).setDate(new Date(trip.startDate).getDate() + 1)),
          },
        ]);

        // Update trip's itineraries array
        await Trip.findByIdAndUpdate(trip._id, { $push: { itineraries: { $each: itineraries.map(itinerary => itinerary._id) } } });

        for (const itinerary of itineraries) {
          const activities = await Activity.insertMany([
            {
              itinerary: itinerary._id,
              title: 'Visit Central Park',
              description: 'A relaxing stroll through Central Park.',
              location: 'New York City',
              startTime: new Date(new Date(itinerary.date).setHours(9, 0, 0)),
              endTime: new Date(new Date(itinerary.date).setHours(12, 0, 0)),
            },
            {
              itinerary: itinerary._id,
              title: 'Broadway Show',
              description: 'Watch a Broadway show.',
              location: 'New York City',
              startTime: new Date(new Date(itinerary.date).setHours(19, 0, 0)),
              endTime: new Date(new Date(itinerary.date).setHours(22, 0, 0)),
            },
          ]);

          // Update itinerary's activities array
          await Itinerary.findByIdAndUpdate(itinerary._id, { $push: { activities: { $each: activities.map(activity => activity._id) } } });

          for (const activity of activities) {
            const expense = await Expense.create({
              trip: trip._id,
              activity: activity._id,
              description: `${activity.title} Tickets`,
              amount: activity.title.includes('Show') ? 150.00 : 50.00,
              date: new Date(activity.startTime),
              category: 'Entertainment',
            });

            // Update activity's expense field
            await Activity.findByIdAndUpdate(activity._id, { expense: expense._id });
          }
        }
      }
    };

    // Create trips for each user
    await createTripsForUser(users[0]);
    await createTripsForUser(users[1]);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

db.once('open', seedData);