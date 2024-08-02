"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = void 0;
const api_error_1 = require("../errors/api.error");
const user_service_1 = require("../services/user.service");
class UserCheck {
    role() {
        return async (req, res, next) => {
            try {
                const _userId = res.locals._userId;
                const role = (await user_service_1.userServices.findOneById(_userId)).role;
                if (req.params.id) {
                    if (req.params.id !== _userId && role !== "admin") {
                        throw new api_error_1.ApiError("Forbidden", 403);
                    }
                }
                else {
                    if (role !== "admin") {
                        throw new api_error_1.ApiError("Forbidden", 403);
                    }
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.userCheck = new UserCheck();
