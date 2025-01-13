"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
// Load transaction data
const transactionData = require('./transactions.json'); // Ensure transactions.json matches the defined structure
const app = (0, express_1.default)();
// Define GraphQL schema
const typeDefs = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
    getAllTransactions: [Day]!
    getTransactionById(transactionId: Int!, date: String!): Transaction
  }

  type Day {
    id: String!
    transactions: [Transaction]!
  }

  type Transaction {
    id: Int!
    timestamp: String!
    amount: Float!
    currencyCode: String!
    currencyRate: Float
    description: String!
    otherParty: OtherParty
  }

  type OtherParty {
    name: String
    iban: String
  }
`);
// Define resolvers
const resolvers = {
    hello: () => {
        return 'Hello, world!';
    },
    getAllTransactions: () => {
        if (transactionData && transactionData.days) {
            return transactionData.days.map((day) => ({
                id: day.id,
                transactions: day.transactions.map((transaction) => ({
                    id: transaction.id,
                    timestamp: transaction.timestamp,
                    amount: transaction.amount,
                    currencyCode: transaction.currencyCode,
                    currencyRate: transaction.currencyRate || null,
                    description: transaction.description,
                    otherParty: transaction.otherParty || null,
                })),
            }));
        }
        else {
            throw new Error('No transaction data available.');
        }
    },
    getTransactionById: ({ transactionId, date, }) => {
        // Find the day with the matching date
        const day = transactionData.days.find((d) => d.id === date);
        if (!day) {
            throw new Error(`No transactions found for the date: ${date}`);
        }
        // Find the transaction with the matching ID in the selected day
        const transaction = day.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            throw new Error(`Transaction with ID: ${transactionId} not found on date: ${date}`);
        }
        // Convert amount to EUR if necessary
        const amountInEur = transaction.currencyCode === 'USD' && transaction.currencyRate
            ? transaction.amount / transaction.currencyRate
            : transaction.amount;
        // Return the transaction with the amount in EUR and currencyCode as "EUR"
        return Object.assign(Object.assign({}, transaction), { amount: amountInEur, currencyCode: 'EUR' });
    },
};
// Add GraphQL endpoint
app.use('/cus-transaction-app/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true,
}));
// Start the server
app.listen(8080, () => {
    console.log('GraphQL server running at http://localhost:8080/cus-transaction-app/graphql');
});
//# sourceMappingURL=server.js.map