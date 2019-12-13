"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_import_1 = require("graphql-import");
const path_1 = __importDefault(require("path"));
const schema = graphql_import_1.importSchema(path_1.default.join(__dirname, 'schema.graphql'));
exports.default = schema;
//# sourceMappingURL=index.js.map