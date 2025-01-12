const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define resolvers
const root = {
  hello: () => {
    return 'Hello, world!';
  },
};

// Add GraphQL endpoint
app.use('/cus-transaction-app/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL UI.
}));

app.listen(8080, () => {
  console.log('GraphQL server running at http://localhost:8080/cus-transaction-app/graphql');
});
