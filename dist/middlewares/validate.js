"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const api_error_1 = require("../errors/api.error");
class Validate {
    validate(validationSchema) {
        return async (req, res, next) => {
            try {
                await validationSchema.validateAsync(req.body);
                next();
            }
            catch (err) {
                const error = err;
                next(new api_error_1.ApiError(error.message, 400));
            }
        };
    }
}
exports.validate = new Validate().validate;
