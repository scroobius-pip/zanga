"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw 'JWT_SECRET NOT DEFINED';
    return secret;
};
//# sourceMappingURL=getJwtSecret.js.map