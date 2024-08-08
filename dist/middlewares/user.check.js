"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = void 0;
const role_enums_1 = require("../enums/role.enums");
const api_error_1 = require("../errors/api.error");
const user_service_1 = require("../services/user.service");
class UserCheck {
    role() {
        return async (req, res, next) => {
            try {
                const _userId = res.locals._userId;
                const user = await user_service_1.userServices.findOneById(_userId);
                if (req.params.id !== _userId && user?.role === role_enums_1.RoleEnum.User) {
                    throw new api_error_1.ApiError("Forbidden", 403);
                }
                res.locals.user = user;
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.userCheck = new UserCheck();
