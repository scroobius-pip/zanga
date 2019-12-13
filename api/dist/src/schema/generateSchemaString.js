"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const fs = require("fs");
console.log(_1.default);
const data = `
const data = \`${_1.default}\`
export default data
`;
console.log('Generating Schema String');
fs.writeFile('./src/schema/schemaString.ts', data, (err) => {
    if (err)
        console.error(err);
    console.log('Successfully Generated Schema String');
});
//# sourceMappingURL=generateSchemaString.js.map