import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from "apollo-utilities";



const backend = 'https://simple-twitter-api.onrender.com'
const backendsockect = 'wss://simple-twitter-api.onrender.com/graphql'
const httpLink = new HttpLink({
  uri: backend,
  //credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: backendsockect,
  options: {
    reconnect: true,
    lazy: true,
    inactivityTimeout: 3000,
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const  client = new ApolloClient({
  link: ApolloLink.from([splitLink]),
  cache: new InMemoryCache(),
});

export default client;