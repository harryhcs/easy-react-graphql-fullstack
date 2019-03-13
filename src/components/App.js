import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

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
        message
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading from API...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div>
          <p>{data.message}</p>
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
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/api" component={Api} />
        <Route path="/info" component={InfoComponent} />
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
