"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const sdk_1 = require("../../../generated/sdk");
const createProperty = async (_, { input }, ctx) => {
    if (!ctx.userId) {
        throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
    }
    const { description, images, location: { city, state }, title, costType, costValue } = input;
    const owner = (await ctx.client.user({ id: ctx.userId })).findUserByID;
    if (!owner)
        throw new Error('Failed to get owner');
    const result = await ctx.client.createProperty({
        property: {
            costType: sdk_1.CostType[costType],
            costValue,
            description,
            images,
            city,
            state,
            title,
            pointCount: 1,
            owner: {
                connect: ctx.userId
            }
        }
    });
    return result.createProperty.id;
};
exports.default = createProperty;
//# sourceMappingURL=createProperty.js.map