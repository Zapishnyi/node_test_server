"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expTimeConverter = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class TimeHelper {
    expTimeConverter(value) {
        const timeValueArr = value.match(/\d*/);
        const timeUnitArr = value.match(/[a-z].*/);
        let resultDate = (0, dayjs_1.default)().toDate();
        if (timeValueArr && timeUnitArr) {
            const timeUnit = timeUnitArr[0];
            resultDate = (0, dayjs_1.default)().subtract(Number(timeValueArr[0]), timeUnit).toDate();
        }
        else {
            console.log("Token expiration converted with error");
        }
        return resultDate;
    }
}
exports.expTimeConverter = new TimeHelper().expTimeConverter;
