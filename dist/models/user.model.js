"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const gender_enum_1 = require("../enums/gender.enum");
const role_enums_1 = require("../enums/role.enums");
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: { type: String, required: false },
    userName: { type: String, require: false, unique: true },
    password: { type: String, required: false },
    age: { type: Number, required: false },
    email: { type: String, require: false, unique: true },
    phone: { type: String, require: false },
    gender: { type: String, enum: gender_enum_1.GenderEnum, required: false },
    role: {
        type: String,
        enum: role_enums_1.RoleEnum,
        required: false,
        default: role_enums_1.RoleEnum.User,
    },
    isVerified: { type: Boolean, require: false, default: false },
}, {
    timestamps: true,
    versionKey: false,
});
exports.UserModel = mongoose_1.default.model("users", userSchema);
