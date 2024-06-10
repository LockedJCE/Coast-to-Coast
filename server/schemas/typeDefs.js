const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    trips: [Trip]
  }

  type Trip {
    _id: ID!
    title: String!
    description: String
    startDate: String!
    endDate: String!
    user: User
    itineraries: [Itinerary]
    expenses: [Expense]
  }

  type Itinerary {
    _id: ID!
    date: String!
    trip: Trip
    activities: [Activity]
  }

  type Activity {
    _id: ID!
    title: String!
    description: String
    location: String
    startTime: String!
    endTime: String!
    itinerary: Itinerary
    expense: Expense
  }

  type Expense {
    _id: ID!
    description: String!
    amount: Float!
    date: String!
    category: String!
    trip: Trip
    activity: Activity
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    trips: [Trip]
    trip(tripId: ID!): Trip
    itineraries(tripId: ID!): [Itinerary]
    itinerary(id: ID!): Itinerary
    activities(itineraryId: ID!): [Activity]
    activity(id: ID!): Activity
    expenses(tripId: ID!): [Expense]
    expense(id: ID!): Expense
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(userId: ID!, title: String!, description: String, startDate: String!, endDate: String!): Trip
    addItinerary(tripId: ID!, date: String!): Itinerary
    addActivity(itineraryId: ID!, title: String!, description: String, location: String, startTime: String!, endTime: String!): Activity
    addExpense(tripId: ID!, description: String!, amount: Float!, date: String!, category: String!): Expense
  }
`;

module.exports = typeDefs;