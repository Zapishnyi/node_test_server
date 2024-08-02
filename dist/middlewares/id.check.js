"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idCheck = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
class IdCheck {
    idCheck() {
        return (req, res, next) => {
            try {
                if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.id)) {
                    throw new api_error_1.ApiError("Invalid ID", 400);
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.idCheck = new IdCheck().idCheck;
