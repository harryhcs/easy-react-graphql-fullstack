import { merge } from 'lodash';
// import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';
import requireContext from 'require-context';

import database from './database';

database.init();

const allTypeDefs = [
  `
  scalar Date

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`,
];

const allResolvers = [
  {
    Date: GraphQLDateTime,
  },
];

const requires = requireContext('../../api/graphql', true, /\.js$/);
requires.keys().forEach(filename => {
  const { typeDefs, resolvers } = requires(filename);
  allTypeDefs.push(typeDefs);
  allResolvers.push(resolvers);
});

const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers: merge(allResolvers),
});

const server = new ApolloServer({
  schema,
});

export default server;
