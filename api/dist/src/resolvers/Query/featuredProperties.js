"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const featuredPropertiesResolver = async (_, args, ctx) => (await ctx.client.featuredProperties())
    .findPropertyByFeatured
    .data;
exports.default = featuredPropertiesResolver;
//# sourceMappingURL=featuredProperties.js.map