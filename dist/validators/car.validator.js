"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCar = void 0;
const joi_1 = __importDefault(require("joi"));
class validCar {
    static brand = joi_1.default.string().max(255).trim();
    static yearBuild = joi_1.default.number()
        .max(new Date().getFullYear())
        .min(1970);
    static price = joi_1.default.number().min(0);
    static img = joi_1.default.string().uri().trim();
    static secondHand = joi_1.default.boolean();
    static create = joi_1.default.object({
        brand: this.brand.required(),
        yearBuild: this.yearBuild.required(),
        price: this.price.required(),
        img: this.img.required(),
        secondHand: this.secondHand.required(),
    });
    static update = joi_1.default.object({
        brand: this.brand,
        yearBuild: this.yearBuild,
        price: this.price,
        img: this.img,
        secondHand: this.secondHand,
    });
}
exports.validCar = validCar;
