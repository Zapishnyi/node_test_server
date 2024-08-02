"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const { Schema } = mongoose_1.default;
const authTokenSchema = new Schema({
    access: { type: String, required: true },
    refresh: { type: String, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: user_model_1.UserModel },
}, {
    timestamps: true,
    versionKey: false,
});
exports.AuthTokenModel = mongoose_1.default.model("auth_tokens", authTokenSchema);
