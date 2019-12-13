import { ApolloServer, gql, AuthenticationError, ForbiddenError } from 'apollo-server-micro'
import jwt from 'jsonwebtoken'
import schema from './schema/schemaString'
import { prisma } from '../generated/prisma-client'
import { Context } from './types/types'
import resolvers from './resolvers'
const gqlSchema = gql(schema)

const cors = require('micro-cors')()

const getIdFromToken = (token: string) => {
    try {
        if (token) {
            const { userId = '' } = jwt.verify(token, 'test') as { userId: string }
            return userId
        }
        return ''
    } catch (error) {
        return ''
    }
}

const server = new ApolloServer({
    playground: true,
    introspection: true,
    // mocks: true,
    resolvers: resolvers as any,
    typeDefs: gqlSchema,
    context: ({ req }: { req: any }): Context => {
        const tokenWithBearer = req.headers.authorization || ''
        const token = tokenWithBearer.split(' ')[1]
        const userId = getIdFromToken(token)
        return {
            prisma,
            userId
        }
    }
})

module.exports = cors(server.createHandler())