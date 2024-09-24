// src/ApolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/88640/web3deliveries/"v.0.0.5"',  
  cache: new InMemoryCache(),
});

export default client;
