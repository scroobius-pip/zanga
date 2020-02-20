"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../../generated/sdk");
const propertiesResolver = async (_, args, ctx) => (await ctx.client.properties({ costType: sdk_1.CostType[args.type] }))
    .findPropertiesByCostType
    .data;
exports.default = propertiesResolver;
//# sourceMappingURL=properties.js.map