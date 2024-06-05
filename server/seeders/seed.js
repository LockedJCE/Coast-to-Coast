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
        password: 'password123', // Note: Password should be hashed in real scenarios
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123', // Note: Password should be hashed in real scenarios
      },
    ]);

    // Create Trips
    const trips = await Trip.insertMany([
      {
        user: users[0]._id,
        title: 'Trip to New York',
        description: 'A fun trip to New York City.',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-06-07'),
      },
      {
        user: users[1]._id,
        title: 'Trip to Paris',
        description: 'A romantic trip to Paris.',
        startDate: new Date('2023-07-15'),
        endDate: new Date('2023-07-22'),
      },
    ]);

    // Create Itineraries
    const itineraries = await Itinerary.insertMany([
      {
        trip: trips[0]._id,
        date: new Date('2023-06-01'),
      },
      {
        trip: trips[0]._id,
        date: new Date('2023-06-02'),
      },
      {
        trip: trips[1]._id,
        date: new Date('2023-07-15'),
      },
      {
        trip: trips[1]._id,
        date: new Date('2023-07-16'),
      },
    ]);

    // Create Activities
    const activities = await Activity.insertMany([
      {
        itinerary: itineraries[0]._id,
        title: 'Visit Central Park',
        description: 'A relaxing stroll through Central Park.',
        location: 'New York City',
        startTime: new Date('2023-06-01T09:00:00'),
        endTime: new Date('2023-06-01T12:00:00'),
      },
      {
        itinerary: itineraries[1]._id,
        title: 'Broadway Show',
        description: 'Watch a Broadway show.',
        location: 'New York City',
        startTime: new Date('2023-06-02T19:00:00'),
        endTime: new Date('2023-06-02T22:00:00'),
      },
      {
        itinerary: itineraries[2]._id,
        title: 'Eiffel Tower Visit',
        description: 'Visit the Eiffel Tower.',
        location: 'Paris',
        startTime: new Date('2023-07-15T10:00:00'),
        endTime: new Date('2023-07-15T12:00:00'),
      },
      {
        itinerary: itineraries[3]._id,
        title: 'Seine River Cruise',
        description: 'Cruise along the Seine River.',
        location: 'Paris',
        startTime: new Date('2023-07-16T14:00:00'),
        endTime: new Date('2023-07-16T16:00:00'),
      },
    ]);

    // Create Expenses
    const expenses = await Expense.insertMany([
      {
        trip: trips[0]._id,
        description: 'Flight to New York',
        amount: 350.00,
        date: new Date('2023-05-31'),
        category: 'Transportation',
      },
      {
        trip: trips[1]._id,
        description: 'Hotel in Paris',
        amount: 700.00,
        date: new Date('2023-07-14'),
        category: 'Accommodation',
      },
      {
        trip: trips[0]._id,
        description: 'Broadway Show Tickets',
        amount: 150.00,
        date: new Date('2023-06-01'),
        category: 'Entertainment',
      },
      {
        trip: trips[1]._id,
        description: 'Seine River Cruise Tickets',
        amount: 50.00,
        date: new Date('2023-07-15'),
        category: 'Entertainment',
      },
    ]);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Ensure that the connection is open before running the seed data
db.once('open', seedData);