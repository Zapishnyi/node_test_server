"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServices = void 0;
const car_model_1 = require("../models/car.model");
const presenter_1 = require("../presenters/presenter");
const car_repository_1 = require("../repositories/car.repository");
class CarServices {
    async findAll({ limit, page, }) {
        const [cars, total] = await car_repository_1.carRepository.findAll({ limit, page });
        return (0, presenter_1.toPresentPaginated)(limit, page, total, cars);
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
