import { MutationResolvers } from '../../../generated/graphqlgen'
import { AuthenticationError } from 'apollo-server-core'

const deleteProperty: MutationResolvers.DeletePropertyResolver = async (_, args, ctx) => {
    if (!ctx.userId) {
        throw new AuthenticationError('Token Not Passed')
    }

    try {
        await ctx.prisma.deleteProperty({ id: args.id })
        return true
    } catch (error) {
        return false
    }

}

export default deleteProperty