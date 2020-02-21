import { QueryResolvers } from '../../../generated/graphqlgen';
import { AuthenticationError } from 'apollo-server-core';
import { User } from '../../types/models';

const meResolver: QueryResolvers.MeResolver = async (_, __, ctx) => {
    if (!ctx.userId) {
        throw new AuthenticationError('Token Not Passed')
    }

    const user = (await ctx.client.user({ id: ctx.userId })).findUserByID
    if (!user) return null

    const userProperties = user?.properties.data ?? []
    const userPoints = user.propertyPoints ?? []

    return {
        ...user,
        properties: userProperties,
        point: {
            propertyPoints: userPoints.map(userPoint => {
                return {
                    points: userPoint.impressions,
                    profit: userPoint.profit,
                    propertyId: userPoint.propertyId,
                    propertyTitle: userPoint.propertyTitle
                }
            }),
            totalPoints: userPoints.reduce((acc, val) => acc + val.impressions, 0),
            totalProfit: userPoints.reduce((acc, current) => { return acc + current.profit }, 0),
        }
    } as User
}

export default meResolver