const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const secret = process.env.JWT_SECRET;

// Function to get user from JWT token
const getUserFromToken = (token) => {
  try {
    if (token) {
      return jwt.verify(token, secret);
    }
    return null;
  } catch (err) {
    return null;
  }
};

// Apollo Server setup with context for authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUserFromToken(token.split(' ')[1]);
    return { user };
  },
});

// Function to start Apollo Server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Middleware for parsing request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }

  // Connect to the database and start the server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the Apollo Server
startApolloServer();