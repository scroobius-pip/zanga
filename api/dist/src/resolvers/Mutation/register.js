"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const twilio_1 = __importDefault(require("twilio"));
const sdk_1 = require("../../../generated/sdk");
const createToken_1 = __importDefault(require("../../functions/createToken"));
const register = async (_, { input }, ctx) => {
    if (input.type === 'Agency') {
        if (!(input.cac && input.tin)) {
            return {
                token: '',
                message: 'Invalid Cac or Tin number'
            };
        }
    }
    if (await ctx.client.userByEmail({ email: input.email })) {
        return {
            token: '',
            message: 'User Exists'
        };
    }
    try {
        const userId = (await ctx.client.createUser({
            user: {
                email: input.email,
                name: input.name,
                password: await bcryptjs_1.default.hash(input.password, 2),
                phone: input.phone,
                type: sdk_1.UserType[input.type]
            }
        })).createUser.id;
        if (userId) {
            try {
                await twilio_1.default('', '').messages.create({
                    body: input.name[0] + " thank you for registering at zanga, start sharing links now!",
                    from: '+234' + '',
                    to: '+234' + input.phone
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        return {
            token: createToken_1.default(userId),
            message: ''
        };
    }
    catch (error) {
        console.log(error);
        return {
            token: '',
            message: error.message
        };
    }
};
exports.default = register;
//# sourceMappingURL=register.js.map