"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const noIdFound_1 = require("../errors/noIdFound");
const car_model_1 = require("../models/car.model");
class CarRepository {
    async findAll({ limit, page, }) {
        const cars = await car_model_1.CarModel.find()
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await car_model_1.CarModel.countDocuments();
        return [cars, total];
    }
    async createOne(dto) {
        return await car_model_1.CarModel.create(dto);
    }
    async findOne(id) {
        const result = await car_model_1.CarModel.findById(id);
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
    async updateOne(id, dto) {
        const result = await car_model_1.CarModel.findOneAndUpdate({ _id: id }, { ...dto }, { returnDocument: "after" });
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
    async replaceOne(id, dto) {
        const result = await car_model_1.CarModel.findOneAndReplace({ _id: id }, { ...dto }, { returnDocument: "after" });
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
    async deleteOne(id) {
        const result = await car_model_1.CarModel.findOneAndDelete({ _id: id });
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
}
exports.carRepository = new CarRepository();
