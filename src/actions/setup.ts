import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext(async (_, { headers }) => {
  let token: string;
  try {
    token = localStorage.getItem('token');
  } catch (error) {
    console.log('Error while accessing localStorage:', error);
  }
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const mainLink = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ));
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  }),
  authLink,
  new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export default new ApolloClient({
  link: mainLink,
  cache: new InMemoryCache({ addTypename: false }),
  // @ts-ignore
  defaultOptions,
});
