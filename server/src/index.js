const cors = require('cors');

const corsOptions = {
  origin: 'https://organic-xylophone-547jrqjr4vfvwjp-3000.app.github.dev', // Allow only this origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const express = require('express');
const app = express();

// Apply CORS to the entire app
app.use(cors(corsOptions));

// Apollo Server setup
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { addMocksToSchema } = require('@graphql-tools/mock');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schema');

// Define mocks
const mocks = {
  Query: () => ({
    tracksForHome: () => [...new Array(6)],
  }),
  Track: () => ({
    id: () => "track_01",
    title: () => "Astro Kitty, Space Explorer",
    author: () => ({
      name: "Grumpy Cat",
      photo: "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
    }),
    thumbnail: () => "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
    length: () => 1210,
    modulesCount: () => 6,
  }),
};

// Apollo Server setup
async function startApolloServer() {
  const server = new ApolloServer({
    schema: addMocksToSchema({
      schema: makeExecutableSchema({ typeDefs }),
      mocks,
    }),
  });

  // Start the server using express
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000, app },
  });

  console.log(`🚀 Server is running at ${url}`);
}

startApolloServer();
