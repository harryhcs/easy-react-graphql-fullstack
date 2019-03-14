import { gql } from 'apollo-server';

import User from '../models/Users';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    organisations: [Organisation]
  }

  input UserInput {
    email: String!
    password: String!
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    userCreate(user: UserInput!): User
  }
`;

export const resolvers = {
  Query: {
    users: () => User.query(),
  },
  Mutation: {
    userCreate: (_, args) => (
      User.query().insert(args.user)
    ),
  },

  User: {
    organisations: user => user.organisations,
  },
};
