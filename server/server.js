const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path');
const { authMiddleware } = require("./utils/auth")



const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;




// Apollo Server setup with context for authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start Apollo Server
const startApolloServer = async () => {
  await server.start();


  // Middleware for parsing request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }))
  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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