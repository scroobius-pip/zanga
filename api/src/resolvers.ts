import { QueryResolvers, MutationResolvers, UserResolvers } from '../generated/graphqlgen'
import { AuthenticationError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import client from 'twilio'


import { UserType, Property } from './types/models'
import { CostType } from '../generated/sdk'


// const User: UserResolvers.Type = {
//     // properties: p => p.,
//     email: p => p.email,
//     id: p => p.id,
//     name: p => p.name,
//     phone: p => p.phone,
//     type: p => p.type
// }

const Query: QueryResolvers.Type = {

    me: async (_, __, ctx) => {
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
    },

    properties: async (_, args, ctx) =>
        (await ctx.client.properties({ costType: CostType[args.type] }))
            .findPropertiesByCostType
            .data
    ,
    property: async (_, args, ctx) => {
        if (!args.id.length) { throw new Error('Id Not Passed') }
        return (await (ctx.client.property({ id: args.id }))).findPropertyByID
    }
}

const Mutation: MutationResolvers.Type = {
    contactAgent: async (_, { input }, ctx) => {

        try {
            await ctx.prisma.createContact({
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
    },


    createProperty: async (_, { input }, ctx) => {

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

    },
    deleteProperty: async (_, args, ctx) => {
        if (!ctx.userId) {
            throw new AuthenticationError('Token Not Passed')
        }

        try {
            await ctx.prisma.deleteProperty({ id: args.id })
            return true
        } catch (error) {
            return false
        }

    },
    login: async (_, { input: { email, password } }, ctx) => {
        const user = await ctx.prisma.user({ email })
        if (!user) {
            return {
                token: '',
                message: 'Email Not Found'
            }
        }

        return {
            token: bcrypt.compareSync(password, user.password) ? createToken(user.id) : '',
            message: ''
        }




    },
    register: async (_, { input }, ctx) => {
        if (input.type === 'Agency') {
            if (!(input.cac && input.tin)) {
                return {
                    token: '',
                    message: 'Invalid Cac or Tin number'
                }
            }
        }
        if (await ctx.prisma.user({ email: input.email })) {
            return {
                token: '',
                message: 'User Exists'
            }
        }

        try {

            const userId = await ctx.prisma.createUser({
                email: input.email,
                name: input.name,
                password: await bcrypt.hash(input.password, 2),
                phone: input.phone,
                type: input.type
            }).id()

            if (userId) {
                try {
                    await client('', '').messages.create({
                        body: input.name[0] + " thank you for registering at zanga, start sharing links now!",
                        from: '+234' + '',
                        to: '+234' + input.phone
                    })

                } catch (error) {
                    console.log(error)
                }
            }

            return {
                token: createToken(userId),
                message: ''
            }
        } catch (error) {
            console.log(error)
            return {
                token: '',
                message: error.message
            }
        }

    }
}

export default {
    Query,
    Mutation,
    User
}
function createToken(userId: string) {
    return jwt.sign({
        userId,
    }, 'test', {
        expiresIn: '30d',
    });
}

