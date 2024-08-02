"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const { Schema } = mongoose_1.default;
const carsSchema = new Schema({
    brand: { type: String, required: true },
    yearBuild: { type: String, require: true },
    price: { type: String, required: true },
    img: { type: String, required: true },
    secondHand: { type: Boolean, required: true },
    _ownerId: { type: Schema.Types.ObjectId, required: true, ref: user_model_1.UserModel },
}, {
    timestamps: true,
    versionKey: false,
});
exports.CarModel = mongoose_1.default.model("cars", carsSchema);
