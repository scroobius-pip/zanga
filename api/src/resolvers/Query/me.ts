import { QueryResolvers } from '../../../generated/graphqlgen';
import { AuthenticationError } from 'apollo-server-core';

const meResolver: QueryResolvers.MeResolver = async (_, __, ctx) => {
    if (!ctx.userId) {
        throw new AuthenticationError('Token Not Passed')
    }

    const user = (await ctx.client.user({ id: ctx.userId })).findUserByID
    if (!user) return null

    const userProperties = user?.properties.data ?? []

    return {
        ...user,
        properties: userProperties
    }
}

export default meResolver