"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_micro_1 = require("apollo-server-micro");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schemaString_1 = __importDefault(require("./schema/schemaString"));
const graphql_request_1 = require("graphql-request");
const sdk_1 = require("../generated/sdk");
const resolvers_1 = __importDefault(require("./resolvers"));
const getJwtSecret_1 = __importDefault(require("./functions/getJwtSecret"));
const client = sdk_1.getSdk(new graphql_request_1.GraphQLClient('https://graphql.fauna.com/graphql', {
    headers: {
        Authorization: 'Bearer ' + process.env.FAUNADB_SECRET
    }
}));
const gqlSchema = apollo_server_micro_1.gql(schemaString_1.default);
const microCors = require('micro-cors');
const cors = microCors({
    allowHeaders: ['X-Requested-With', 'Access-Control-Allow-Origin',
        'X-HTTP-Method-Override', 'Content-Type',
        'Authorization', 'Accept', 'token']
});
const getIdFromToken = (token) => {
    try {
        if (token) {
            const { userId = '' } = jsonwebtoken_1.default.verify(token, getJwtSecret_1.default());
            return userId;
        }
        return '';
    }
    catch (error) {
        return '';
    }
};
const server = new apollo_server_micro_1.ApolloServer({
    playground: true,
    introspection: true,
    // mocks: true,
    resolvers: resolvers_1.default,
    typeDefs: gqlSchema,
    context: ({ req }) => {
        const tokenWithBearer = req.headers.authorization || '';
        const token = tokenWithBearer.split(' ')[1];
        const userId = getIdFromToken(token);
        return {
            client,
            userId
        };
    }
});
// @ts-ignore
exports.default = cors((req, res) => {
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    return server.createHandler()(req, res);
});
//# sourceMappingURL=index.js.map