"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServices = void 0;
const car_model_1 = require("../models/car.model");
const car_repository_1 = require("../repositories/car.repository");
class CarServices {
    async findAll() {
        return await car_repository_1.carRepository.findAll();
    }
    async findOne(carId) {
        return await car_repository_1.carRepository.findOne(carId);
    }
    async createOne(dto) {
        await car_model_1.CarModel.syncIndexes();
        return await car_repository_1.carRepository.createOne(dto);
    }
    async updateOne(carId, dto) {
        return await car_repository_1.carRepository.updateOne(carId, dto);
    }
    async replaceOne(carId, dto) {
        return await car_repository_1.carRepository.replaceOne(carId, dto);
    }
    async deleteOne(carId) {
        return await car_repository_1.carRepository.deleteOne(carId);
    }
}
exports.carServices = new CarServices();
