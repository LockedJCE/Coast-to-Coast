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
    const usersData = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123',
      },
    ];

    const users = [];

    // This will trigger the pre save hook to hash the password
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save();
      users.push(user);
    }

    // Create trips, itineraries, activities, and expenses
    const createTripsForUser = async (user) => {
      const tripsData = [
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
      ];

      const trips = await Trip.insertMany(tripsData);

      // Update user's trips array
      await User.findByIdAndUpdate(user._id, { $push: { trips: { $each: trips.map(trip => trip._id) } } });

      const itinerariesData = [
        {
          trip: trips[0]._id,
          date: new Date(trips[0].startDate),
          activities: [
            {
              title: 'Visit Central Park',
              description: 'A relaxing stroll through Central Park.',
              location: 'New York City',
              startTime: new Date(new Date(trips[0].startDate).setHours(9, 0, 0)),
              endTime: new Date(new Date(trips[0].startDate).setHours(12, 0, 0)),
            },
            {
              title: 'Broadway Show',
              description: 'Watch a Broadway show.',
              location: 'New York City',
              startTime: new Date(new Date(trips[0].startDate).setHours(19, 0, 0)),
              endTime: new Date(new Date(trips[0].startDate).setHours(22, 0, 0)),
            },
          ],
        },
        {
          trip: trips[0]._id,
          date: new Date(trips[0].startDate.setDate(trips[0].startDate.getDate() + 1)),
          activities: [
            {
              title: 'Statue of Liberty Tour',
              description: 'A tour of the Statue of Liberty.',
              location: 'New York City',
              startTime: new Date(new Date(trips[0].startDate.setDate(trips[0].startDate.getDate() + 1)).setHours(10, 0, 0)),
              endTime: new Date(new Date(trips[0].startDate.setDate(trips[0].startDate.getDate() + 1)).setHours(13, 0, 0)),
            },
            {
              title: 'Empire State Building',
              description: 'Visit the Empire State Building.',
              location: 'New York City',
              startTime: new Date(new Date(trips[0].startDate.setDate(trips[0].startDate.getDate() + 1)).setHours(14, 0, 0)),
              endTime: new Date(new Date(trips[0].startDate.setDate(trips[0].startDate.getDate() + 1)).setHours(17, 0, 0)),
            },
          ],
        },
        {
          trip: trips[1]._id,
          date: new Date(trips[1].startDate),
          activities: [
            {
              title: 'Visit the Louvre',
              description: 'Explore the Louvre Museum.',
              location: 'Paris',
              startTime: new Date(new Date(trips[1].startDate).setHours(10, 0, 0)),
              endTime: new Date(new Date(trips[1].startDate).setHours(14, 0, 0)),
            },
            {
              title: 'Dinner Cruise on the Seine',
              description: 'Enjoy a dinner cruise on the Seine River.',
              location: 'Paris',
              startTime: new Date(new Date(trips[1].startDate).setHours(20, 0, 0)),
              endTime: new Date(new Date(trips[1].startDate).setHours(23, 0, 0)),
            },
          ],
        },
        {
          trip: trips[1]._id,
          date: new Date(trips[1].startDate.setDate(trips[1].startDate.getDate() + 1)),
          activities: [
            {
              title: 'Eiffel Tower Tour',
              description: 'A tour of the Eiffel Tower.',
              location: 'Paris',
              startTime: new Date(new Date(trips[1].startDate.setDate(trips[1].startDate.getDate() + 1)).setHours(9, 0, 0)),
              endTime: new Date(new Date(trips[1].startDate.setDate(trips[1].startDate.getDate() + 1)).setHours(11, 0, 0)),
            },
            {
              title: 'Montmartre Visit',
              description: 'Visit the Montmartre district.',
              location: 'Paris',
              startTime: new Date(new Date(trips[1].startDate.setDate(trips[1].startDate.getDate() + 1)).setHours(13, 0, 0)),
              endTime: new Date(new Date(trips[1].startDate.setDate(trips[1].startDate.getDate() + 1)).setHours(16, 0, 0)),
            },
          ],
        },
      ];

      for (const itineraryData of itinerariesData) {
        const itinerary = await Itinerary.create({
          trip: itineraryData.trip,
          date: itineraryData.date,
        });

        const activities = await Activity.insertMany(
          itineraryData.activities.map(activity => ({
            ...activity,
            itinerary: itinerary._id,
          }))
        );

        // Update itinerary's activities array
        await Itinerary.findByIdAndUpdate(itinerary._id, { $push: { activities: { $each: activities.map(activity => activity._id) } } });

        for (const activity of activities) {
          const expense = await Expense.create({
            trip: itineraryData.trip,
            activity: activity._id,
            description: `${activity.title} Tickets`,
            amount: activity.title.includes('Show') || activity.title.includes('Cruise') ? 150.00 : 50.00,
            date: new Date(activity.startTime),
            category: 'Entertainment',
          });

          // Update activity's expense field
          await Activity.findByIdAndUpdate(activity._id, { expense: expense._id });
        }

        // Update trip's itineraries array
        await Trip.findByIdAndUpdate(itineraryData.trip, { $push: { itineraries: itinerary._id } });
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