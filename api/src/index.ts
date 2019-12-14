import { ApolloServer, gql, AuthenticationError, ForbiddenError } from 'apollo-server-micro'
import jwt from 'jsonwebtoken'
import schema from './schema/schemaString'
import { prisma } from '../generated/prisma-client'
import { Context } from './types/types'
import resolvers from './resolvers'
const gqlSchema = gql(schema)

const microCors = require('micro-cors')
const cors = microCors({
    allowHeaders: ['X-Requested-With', 'Access-Control-Allow-Origin',
        'X-HTTP-Method-Override', 'Content-Type',
        'Authorization', 'Accept', 'token']
})
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

// @ts-ignore
export default cors((req, res) => {
    if (req.method === 'OPTIONS') {
        res.end()
        return
    }
    return server.createHandler()(req, res)
})