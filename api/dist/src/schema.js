"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const path = __importStar(require("path"));
const nexus_prisma_1 = require("nexus-prisma");
const prisma_client_1 = require("../generated/prisma-client");
const nexus_prisma_2 = __importDefault(require("../generated/nexus-prisma"));
const Query = nexus_1.queryType({
    definition(t) {
        t.string('hello', {
            args: { name: nexus_1.stringArg({ nullable: true }) },
            resolve: (parent, { name }) => `Hello ${name || 'world'}`
        });
    }
});
const schema = nexus_prisma_1.makePrismaSchema({
    types: [Query],
    prisma: {
        datamodelInfo: nexus_prisma_2.default,
        client: prisma_client_1.prisma
    },
    outputs: {
        schema: path.join(__dirname, './generated/schema.graphql'),
        typegen: path.join(__dirname, './generated/nexus.ts'),
    }
});
exports.default = schema;
//# sourceMappingURL=schema.js.map