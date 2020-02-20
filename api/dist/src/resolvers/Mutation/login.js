"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createToken_1 = __importDefault(require("../../functions/createToken"));
const login = async (_, { input: { email, password } }, ctx) => {
    const user = (await ctx.client.userByEmail({ email })).findUserByEmail;
    if (!user) {
        return {
            token: '',
            message: 'Email Not Found'
        };
    }
    return {
        token: bcryptjs_1.default.compareSync(password, user.password) ? createToken_1.default(user.id) : '',
        message: ''
    };
};
exports.default = login;
//# sourceMappingURL=login.js.map