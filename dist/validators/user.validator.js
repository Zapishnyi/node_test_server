"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUser = void 0;
const joi_1 = __importDefault(require("joi"));
const regexp_1 = require("../constants/regexp");
const gender_enum_1 = require("../enums/gender.enum");
const role_enums_1 = require("../enums/role.enums");
class validUser {
    static name = joi_1.default.string().max(255).min(3).trim();
    static userName = joi_1.default.string().max(255).min(3).trim();
    static password = joi_1.default.string()
        .min(8)
        .pattern(regexp_1.regexp.password)
        .trim()
        .messages({
        "string.pattern.base": "Password must contain:8 characters in length, at least one uppercase English letter, at least one lowercase English letter, at least one digit, at least one special character ",
    });
    static age = joi_1.default.number().min(1).max(120);
    static email = joi_1.default.string().pattern(regexp_1.regexp.email).trim().messages({
        "string.pattern.base": "Must be a valid email address",
    });
    static phone = joi_1.default.string().pattern(regexp_1.regexp.phone).trim().messages({
        "string.pattern.base": "Must be a valid phone number",
    });
    static gender = joi_1.default.string().valid(...Object.values(gender_enum_1.GenderEnum));
    static role = joi_1.default.string().valid(...Object.values(role_enums_1.RoleEnum));
    static login = joi_1.default.object({
        userName: this.userName.required(),
        password: this.password.required(),
    });
    static emailCheck = joi_1.default.object({
        email: this.email.required(),
    });
    static passwordCheck = joi_1.default.object({
        password: this.password.required(),
    });
    static changePasswordCheck = joi_1.default.object({
        oldPassword: this.password.required(),
        password: this.password.required(),
    });
    static singUp = joi_1.default.object({
        userName: this.userName.required(),
        password: this.password.required(),
        email: this.email.required(),
    });
    static roleOnly = joi_1.default.object({
        role: this.role.required(),
    });
    static userUpdate = joi_1.default.object({
        name: this.name,
        age: this.age,
        phone: this.phone,
        gender: this.gender,
    });
}
exports.validUser = validUser;
