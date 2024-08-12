"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUserDelete = void 0;
const joi_1 = __importDefault(require("joi"));
class validUserDelete {
    static name = joi_1.default.any();
    static age = joi_1.default.any();
    static phone = joi_1.default.any();
    static gender = joi_1.default.any();
    static avatar = joi_1.default.any();
    static keysDelete = joi_1.default.object({
        name: this.name,
        age: this.age,
        phone: this.phone,
        gender: this.gender,
        avatar: this.avatar,
    });
}
exports.validUserDelete = validUserDelete;
