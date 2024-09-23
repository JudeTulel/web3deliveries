// /src/lib/ApolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { useMemo } from 'react';

let apolloClient: ApolloClient<any>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Enable SSR mode
    link: new HttpLink({
      uri: 'https://api.studio.thegraph.com/query/88640/web3deliveries/version/latest',
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Restore the initial state if it exists
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  // For SSR or SSG, always return a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // For client-side, create Apollo Client once
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
