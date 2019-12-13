"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_micro_1 = require("apollo-server-micro");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schemaString_1 = __importDefault(require("./schema/schemaString"));
const prisma_client_1 = require("../generated/prisma-client");
const resolvers_1 = __importDefault(require("./resolvers"));
const gqlSchema = apollo_server_micro_1.gql(schemaString_1.default);
const cors = require('micro-cors')();
const getIdFromToken = (token) => {
    try {
        if (token) {
            const { userId = '' } = jsonwebtoken_1.default.verify(token, 'test');
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
            prisma: prisma_client_1.prisma,
            userId
        };
    }
});
module.exports = cors(server.createHandler());
//# sourceMappingURL=index.js.map