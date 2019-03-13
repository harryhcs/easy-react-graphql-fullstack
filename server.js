import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.babel';
import Express from 'express';
import expressGraphql from 'express-graphql';
import { buildSchema } from 'graphql';

const app = new Express();
const port = 3001;

const compiler = webpack(config);

const schema = buildSchema(`
    type Query {
        message: String
    }
`);
const root = {
  message: () => `Hello world! Express server running at port ${port}`
};

app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);
app.use(
  "/graphql",
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) {
    console.error(error);
  } else {
    console.info(
      'Server running at http://localhost:%s/',
      port
    );
  }
  /* eslint-enable no-console */
});
