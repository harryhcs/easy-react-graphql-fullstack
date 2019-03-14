import { gql } from 'apollo-server';

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
    organisations: () => Organisation.query(),
  },
  Mutation: {
    organisationCreate: (_, args) => (
      Organisation.query().insert(args.category)
    ),
  },
};
