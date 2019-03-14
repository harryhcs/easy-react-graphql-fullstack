import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Header from './Header';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql/',
});

const RouteCompnent = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/info">Info</Link>
    </li>
    <li>
      <Link to="/api">GraphQL API</Link>
    </li>
  </ul>
);

const Api = () => (
  <Query
    query={gql`
      query {
        organisations {
          name
          slug
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading from API...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <p>{data}</p>
          <RouteCompnent />
        </div>
      );
    }}
  </Query>
);

const Home = () => (
  <div>
    <p>Home component!</p>
    <RouteCompnent />
  </div>
);

const InfoComponent = () => (
  <div>
    <p>Info component!</p>
    <RouteCompnent />
  </div>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/api" component={Api} />
      <Route path="/info" component={InfoComponent} />
    </div>
  </ApolloProvider>
);

export default withRouter(App);
