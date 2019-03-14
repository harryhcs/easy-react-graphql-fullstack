import { gql, AuthenticationError } from 'apollo-server';

import Organisation from '../models/Organisations';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Organisation {
    id: ID!
    name: String!
    slug: String!
  }

  input OrganisationInput {
    name: String!
    slug: String!
    owner_id: ID!
  }
  extend type Query {
    organisations: [Organisation]
  }
  extend type Mutation {
    organisationCreate(organisation: OrganisationInput!): Organisation
  }
`;

export const resolvers = {
  Query: {
    organisations: async (_,{}, { user }) => {
      try {
        const email = await user;
        const org = await Organisation.query();
        return org;
      } catch (e) {
        throw new AuthenticationError('You must be logged in to do this');
      }
    },
  },
  Mutation: {
    organisationCreate: (_, args) => (
      Organisation.query().insert(args.category)
    ),
  },
};
