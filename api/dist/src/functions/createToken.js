"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJwtSecret_1 = __importDefault(require("./getJwtSecret"));
exports.default = (userId) => {
    return jsonwebtoken_1.default.sign({
        userId,
    }, getJwtSecret_1.default(), {
        expiresIn: '30d',
    });
};
//# sourceMappingURL=createToken.js.map