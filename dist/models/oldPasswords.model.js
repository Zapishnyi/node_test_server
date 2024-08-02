"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oldPasswordModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const { Schema } = mongoose_1.default;
const oldPasswordsSchema = new Schema({
    password: { type: String, required: true, unique: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: user_model_1.UserModel },
}, {
    timestamps: true,
    versionKey: false,
});
exports.oldPasswordModel = mongoose_1.default.model("old_passwords", oldPasswordsSchema);
