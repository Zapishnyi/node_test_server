"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carCheck = void 0;
const api_error_1 = require("../errors/api.error");
const car_service_1 = require("../services/car.service");
const user_service_1 = require("../services/user.service");
class CarCheck {
    role() {
        return async (req, res, next) => {
            try {
                const ownerId = (await car_service_1.carServices.findOne(req.params.id))
                    ._ownerId;
                const userId = res.locals.userId;
                const role = (await user_service_1.userServices.findOneById(userId)).role;
                if (ownerId !== userId && role !== "admin") {
                    throw new api_error_1.ApiError("You have no rights to change this resource", 403);
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.carCheck = new CarCheck();
