"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactAgent_1 = __importDefault(require("./contactAgent"));
const createProperty_1 = __importDefault(require("./createProperty"));
const deleteProperty_1 = __importDefault(require("./deleteProperty"));
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const Mutation = {
    contactAgent: contactAgent_1.default,
    createProperty: createProperty_1.default,
    deleteProperty: deleteProperty_1.default,
    login: login_1.default,
    register: register_1.default
};
exports.default = Mutation;
//# sourceMappingURL=index.js.map