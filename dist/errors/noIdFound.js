"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noFoundCheck = void 0;
const api_error_1 = require("./api.error");
const noFoundCheck = (payload, result) => {
    if (!result) {
        throw new api_error_1.ApiError(`Record: ${payload} is not found`, 404);
    }
};
exports.noFoundCheck = noFoundCheck;
