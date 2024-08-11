"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateQuery = void 0;
const api_error_1 = require("../errors/api.error");
class Validate {
    validateBody(validationSchema) {
        return async (req, res, next) => {
            try {
                req.body = await validationSchema.validateAsync(req.body);
                next();
            }
            catch (err) {
                const error = err;
                next(new api_error_1.ApiError(error.message, 400));
            }
        };
    }
    validateQuery(validationSchema) {
        return async (req, res, next) => {
            try {
                req.query = await validationSchema.validateAsync(req.query);
                next();
            }
            catch (err) {
                const error = err;
                next(new api_error_1.ApiError(error.message, 400));
            }
        };
    }
}
_a = new Validate(), exports.validateQuery = _a.validateQuery, exports.validateBody = _a.validateBody;
