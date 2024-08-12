"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTokenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const actionType_enum_1 = require("../enums/actionType.enum");
const user_model_1 = require("./user.model");
const { Schema } = mongoose_1.default;
const actionTokenSchema = new Schema({
    action: { type: String, required: true },
    type: { type: String, enum: actionType_enum_1.ActionTypeEnum, required: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: user_model_1.UserModel },
}, {
    timestamps: true,
    versionKey: false,
});
exports.ActionTokenModel = mongoose_1.default.model("action_tokens", actionTokenSchema);
