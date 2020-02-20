import { MutationResolvers } from '../../../generated/graphqlgen';
import addContactToSheet from '../../functions/addContactToSheet';

const contactAgent: MutationResolvers.ContactAgentResolver = async (_, { input }, ctx) => {

    try {
        await ctx.client.createContact({
            contact: {
                name: input.name,
                number: input.number,
                email: input.email,
                notes: input.notes,
                property: {
                    connect: input.propertyId
                }
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

        await addContactToSheet({
            email: input.email,
            name: input.name,
            notes: input.notes,
            number: input.number,
            propertyId: input.propertyId,
            referrerId: input.referrerId ?? ''
        })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default contactAgent