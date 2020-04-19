"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const me_1 = __importDefault(require("./me"));
const properties_1 = __importDefault(require("./properties"));
const property_1 = __importDefault(require("./property"));
const constants_1 = require("../../constants");
const featuredProperties_1 = __importDefault(require("./featuredProperties"));
const Query = {
    me: me_1.default,
    properties: properties_1.default,
    property: property_1.default,
    currentRate: () => constants_1.POINT_RATE,
    featuredProperties: featuredProperties_1.default
};
exports.default = Query;
//# sourceMappingURL=index.js.map