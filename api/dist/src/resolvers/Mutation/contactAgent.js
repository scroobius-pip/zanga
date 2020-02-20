"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addContactToSheet_1 = __importDefault(require("../../functions/addContactToSheet"));
const contactAgent = async (_, { input }, ctx) => {
    var _a;
    try {
        await ctx.client.createContact({
            contact: {
                name: input.name,
                number: input.number,
                email: input.email,
                notes: input.notes,
                property: {
                    connect: input.propertyId
                }
            }
        });
        if (input.referrerId) {
            // const referrerNumber = await ctx.prisma.user({ id: input.referrerId }).phone()
            // try {
            //     await client('', '').messages.create({
            //         body: "Someone has shown interest in the property you shared: " + "zanga.now.sh/property/" + input.propertyId,
            //         from: '+234' + '',
            //         to: '+234' + referrerNumber
            //     })
            // } catch (error) {
            // }
            //TWILIO HERE
        }
        await addContactToSheet_1.default({
            email: input.email,
            name: input.name,
            notes: input.notes,
            number: input.number,
            propertyId: input.propertyId,
            referrerId: (_a = input.referrerId, (_a !== null && _a !== void 0 ? _a : ''))
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.default = contactAgent;
//# sourceMappingURL=contactAgent.js.map