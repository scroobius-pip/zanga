"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const deleteProperty = async (_, args, ctx) => {
    if (!ctx.userId) {
        throw new apollo_server_core_1.AuthenticationError('Token Not Passed');
    }
    await ctx.client.deleteProperty({ id: args.id });
    return true;
};
exports.default = deleteProperty;
//# sourceMappingURL=deleteProperty.js.map