"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPresentUser = exports.toPresentPaginated = void 0;
const config_1 = require("../configs/config");
class Presenter {
    toPresentUser(user) {
        return {
            _id: user?._id,
            userName: user?.userName,
            email: user?.email,
            role: user?.role,
            name: user?.name,
            age: user?.age,
            phone: user?.phone,
            avatar: user?.avatar
                ? config_1.config.AWS_END_POINT_URL + "/" + user.avatar
                : undefined,
            gender: user?.gender,
            isVerified: user?.isVerified,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
        };
    }
    toPresentPaginated(query) {
        return {
            limit: query.limit,
            page: query.page,
            total: query.total,
            order: query.order,
            orderBy: query.orderBy,
            search: query.search,
            data: query.data,
        };
    }
}
_a = new Presenter(), exports.toPresentPaginated = _a.toPresentPaginated, exports.toPresentUser = _a.toPresentUser;
