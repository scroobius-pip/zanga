"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = {
    properties: async (parent, args, ctx) => await ctx.prisma.properties({ where: { ownerId: parent.id } }),
    email: p => p.email,
    id: p => p.id,
    name: p => p.name,
    phone: p => p.phone,
    type: p => p.type
};
const Query = {
    me: async (_, __, ctx) => {
        if (!ctx.userId) {
            throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
        }
        const user = await ctx.prisma.user({ id: ctx.userId });
        return user;
    },
    properties: (_, args, ctx) => {
        // return args.type
        return args.type ? ctx.prisma.properties({ where: { costType: args.type } }) : ctx.prisma.properties();
    },
    property: (_, args, ctx) => {
        if (!args.id.length) {
            throw new Error('Id Not Passed');
        }
        return ctx.prisma.property({ id: args.id });
    }
};
const Mutation = {
    contactAgent: async (_, { input }, ctx) => {
        try {
            await ctx.prisma.createContact({
                name: input.name,
                number: input.number,
                property: {
                    connect: { id: input.propertyId }
                }
            });
            if (input.referrerId) {
                const referrerNumber = await ctx.prisma.user({ id: input.referrerId }).phone();
                //TWILIO HERE
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    },
    createProperty: async (_, { input }, ctx) => {
        if (!ctx.userId) {
            throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
        }
        const { description, images, location: { city, state }, title, costType, costValue } = input;
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
        }).id();
    },
    deleteProperty: async (_, args, ctx) => {
        if (!ctx.userId) {
            throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
        }
        try {
            await ctx.prisma.deleteProperty({ id: args.id });
            return true;
        }
        catch (error) {
            return false;
        }
    },
    login: async (_, { input: { email, password } }, ctx) => {
        const user = await ctx.prisma.user({ email });
        if (!user) {
            return {
                token: '',
                message: 'Email Not Found'
            };
        }
        return {
            token: bcryptjs_1.default.compareSync(password, user.password) ? createToken(user.id) : '',
            message: ''
        };
    },
    register: async (_, { input }, ctx) => {
        if (input.type === 'Agency') {
            if (!(input.cac && input.tin)) {
                return {
                    token: '',
                    message: 'Invalid Cac or Tin number'
                };
            }
        }
        if (await ctx.prisma.user({ email: input.email })) {
            return {
                token: '',
                message: 'User Exists'
            };
        }
        try {
            const userId = await ctx.prisma.createUser({
                email: input.email,
                name: input.name,
                password: await bcryptjs_1.default.hash(input.password, 2),
                phone: input.phone,
                type: input.type
            }).id();
            return {
                token: createToken(userId),
                message: ''
            };
        }
        catch (error) {
            console.log(error);
            return {
                token: '',
                message: error.message
            };
        }
    }
};
exports.default = {
    Query,
    Mutation,
    User
};
function createToken(userId) {
    return jsonwebtoken_1.default.sign({
        userId,
    }, 'test', {
        expiresIn: '30d',
    });
}
//# sourceMappingURL=resolvers.js.map