import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import Tracks from "./Component/Tracks";

// HTTP connection for query operations
const httpLink = new HttpLink({
  uri: 'https://organic-xylophone-547jrqjr4vfvwjp-4000.app.github.dev/graphql',  // Correct server URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return <Tracks />;
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<ApolloProvider client={client}><App /></ApolloProvider>);
