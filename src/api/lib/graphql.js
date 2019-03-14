import { merge } from 'lodash';
// import { makeExecutableSchema } from 'apollo-server';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { GraphQLDateTime } from 'graphql-iso-date';
import requireContext from 'require-context';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import database from './database';

database.init();

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID } = process.env;


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

const requires = requireContext('../../src/api/graphql', true, /\.js$/);
requires.keys().forEach(filename => {
  console.log(filename);
  const { typeDefs, resolvers } = requires(filename);
  allTypeDefs.push(typeDefs);
  allResolvers.push(resolvers);
});

const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers: merge(allResolvers),
});

const client = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});
const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
};
const options = {
  audience: AUTH0_CLIENT_ID,
  issuer: `https://${AUTH0_DOMAIN}>/`,
  algorithms: ['RS256'],
};

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded.email);
      });
    });

    return {
      user,
    };
  },
});

export default server;
