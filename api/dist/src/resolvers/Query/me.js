"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const meResolver = async (_, __, ctx) => {
    var _a, _b, _c, _d, _e;
    if (!ctx.userId) {
        throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
    }
    const user = (await ctx.client.user({ id: ctx.userId })).findUserByID;
    if (!user)
        return null;
    const userProperties = (_b = (_a = user) === null || _a === void 0 ? void 0 : _a.properties.data, (_b !== null && _b !== void 0 ? _b : []));
    const userPoints = (_c = user.propertyPoints, (_c !== null && _c !== void 0 ? _c : []));
    const userPointsData = (_e = (_d = userPoints) === null || _d === void 0 ? void 0 : _d.data, (_e !== null && _e !== void 0 ? _e : []));
    return {
        ...user,
        properties: userProperties,
        point: {
            propertyPoints: (userPointsData).map(userPoint => {
                var _a, _b, _c, _d;
                return {
                    points: (_a = userPoint) === null || _a === void 0 ? void 0 : _a.impressions,
                    profit: (_b = userPoint) === null || _b === void 0 ? void 0 : _b.profit,
                    propertyId: (_c = userPoint) === null || _c === void 0 ? void 0 : _c.propertyId,
                    propertyTitle: (_d = userPoint) === null || _d === void 0 ? void 0 : _d.propertyTitle
                };
            }),
            totalPoints: userPointsData.reduce((acc, val) => {
                const impressions = val ? val.impressions : 0;
                return acc + impressions;
            }, 0),
            totalProfit: userPointsData.reduce((acc, current) => {
                const profit = current ? current.profit : 0;
                return acc + profit;
            }, 0),
        }
    };
};
exports.default = meResolver;
//# sourceMappingURL=me.js.map