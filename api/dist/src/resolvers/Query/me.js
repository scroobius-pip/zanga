"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const meResolver = async (_, __, ctx) => {
    var _a, _b, _c;
    if (!ctx.userId) {
        throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
    }
    const user = (await ctx.client.user({ id: ctx.userId })).findUserByID;
    if (!user)
        return null;
    const userProperties = (_b = (_a = user) === null || _a === void 0 ? void 0 : _a.properties.data, (_b !== null && _b !== void 0 ? _b : []));
    const userPoints = (_c = user.propertyPoints, (_c !== null && _c !== void 0 ? _c : []));
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
                };
            }),
            totalPoints: userPoints.reduce((acc, val) => acc + val.impressions, 0),
            totalProfit: userPoints.reduce((acc, current) => { return acc + current.profit; }, 0),
        }
    };
};
exports.default = meResolver;
//# sourceMappingURL=me.js.map