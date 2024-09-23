// /app/providers.tsx
'use client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/ApolloClient';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const apolloClient = useApollo();
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
