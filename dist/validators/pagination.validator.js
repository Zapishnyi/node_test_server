"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validPagination = void 0;
const joi_1 = __importDefault(require("joi"));
const carOrderBy_enum_1 = require("../enums/carOrderBy.enum");
const order_enum_1 = require("../enums/order.enum");
const userOrderBy_enum_1 = require("../enums/userOrderBy.enum");
class validPagination {
    static limit = joi_1.default.number().min(1).max(100).default(10);
    static page = joi_1.default.number().min(1).default(1);
    static search = joi_1.default.any();
    static order = joi_1.default.string()
        .valid(...Object.values(order_enum_1.OrderEnum))
        .default(order_enum_1.OrderEnum.ASC);
    static orderBy = joi_1.default.string().default(userOrderBy_enum_1.UserOrderByEnum.USER_NAME);
    static searchQueryUser = joi_1.default.object({
        limit: this.limit,
        page: this.page,
        search: this.search,
        order: this.order,
        orderBy: this.orderBy
            .valid(...Object.values(userOrderBy_enum_1.UserOrderByEnum))
            .default(userOrderBy_enum_1.UserOrderByEnum.USER_NAME),
    });
    static searchQueryCar = joi_1.default.object({
        limit: this.limit,
        page: this.page,
        search: this.search,
        order: this.order,
        orderBy: this.orderBy
            .valid(...Object.values(carOrderBy_enum_1.CarOrderByEnum))
            .default(carOrderBy_enum_1.CarOrderByEnum.BRAND),
    });
}
exports.validPagination = validPagination;
