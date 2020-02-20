"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fecha_1 = require("fecha");
const SteinStore = require("stein-js-client");
exports.default = async (contact) => {
    const store = new SteinStore("https://api.steinhq.com/v1/storages/5e4ed78b5a823204986f3bc4");
    const date = fecha_1.format(new Date(), 'MM/DD/YYYY HH:mm:ss');
    await store.append('Sheet1', [{
            ...contact,
            date
        }]);
};
//# sourceMappingURL=addContactToSheet.js.map