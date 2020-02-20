import { MutationResolvers } from '../../../generated/graphqlgen';
import { AuthenticationError } from 'apollo-server-core';

const createProperty: MutationResolvers.CreatePropertyResolver = async (_, { input }, ctx) => {

    if (!ctx.userId) {
        throw new AuthenticationError('Token Not Passed')
    }
    const { description, images, location: { city, state }, title, costType, costValue } = input
    return ctx.prisma.createProperty({
        costType,
        costValue,
        description,
        images: {
            set: images
        },
        city,
        state,
        title,
        ownerId: ctx.userId,
        ownerName: await ctx.prisma.user({ id: ctx.userId }).name()
    }).id()

}

export default createProperty