import { MutationResolvers } from '../../../generated/graphqlgen';

const contactAgent: MutationResolvers.ContactAgentResolver = async (_, { input }, ctx) => {

    try {
        await ctx.client.createContact({
            name: input.name,
            number: input.number,
            email: input.email,
            notes: input.notes,
            property: {
                connect: { id: input.propertyId }
            }
        })
        if (input.referrerId) {
            // const referrerNumber = await ctx.prisma.user({ id: input.referrerId }).phone()
            // try {
            //     await client('', '').messages.create({
            //         body: "Someone has shown interest in the property you shared: " + "zanga.now.sh/property/" + input.propertyId,
            //         from: '+234' + '',
            //         to: '+234' + referrerNumber
            //     })

            // } catch (error) {

            // }
            //TWILIO HERE
        }

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default contactAgent