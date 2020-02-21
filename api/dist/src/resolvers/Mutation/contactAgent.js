"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addContactToSheet_1 = __importDefault(require("../../functions/addContactToSheet"));
const constants_1 = require("../../constants");
const contactAgent = async (_, { input }, ctx) => {
    var _a, _b;
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
            const property = (await ctx.client.property({
                id: input.propertyId,
            })).findPropertyByID;
            if (!property)
                throw 'property id wrong';
            let propertyPointId = (_a = (await ctx.client.propertyPoint({
                propertyId: input.propertyId
            })).findPropertyPointByPropertyId) === null || _a === void 0 ? void 0 : _a.propertyId;
            if (!propertyPointId) {
                propertyPointId = (await ctx.client.createPropertyPoint({
                    data: {
                        impressions: 1,
                        profit: property.pointCount * constants_1.POINT_RATE,
                        propertyId: property.id,
                        propertyTitle: property.title,
                        user: {
                            connect: input.referrerId
                        }
                    }
                })).createPropertyPoint.id;
            }
            await ctx.client.incrementPropertyPoint({
                pointNo: property.pointCount,
                propertyPointId: propertyPointId,
                rate: constants_1.POINT_RATE
            });
        }
        await addContactToSheet_1.default({
            email: input.email,
            name: input.name,
            notes: input.notes,
            number: input.number,
            propertyId: input.propertyId,
            referrerId: (_b = input.referrerId, (_b !== null && _b !== void 0 ? _b : ''))
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