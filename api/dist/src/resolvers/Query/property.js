"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const propertyResolver = async (_, args, ctx) => {
    if (!args.id.length) {
        throw new Error('Id Not Passed');
    }
    return (await (ctx.client.property({ id: args.id }))).findPropertyByID;
};
exports.default = propertyResolver;
//# sourceMappingURL=property.js.map