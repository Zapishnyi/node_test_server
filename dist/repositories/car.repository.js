"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRepository = void 0;
const mongoose_1 = require("mongoose");
const noIdFound_1 = require("../errors/noIdFound");
const car_model_1 = require("../models/car.model");
class CarRepository {
    async findAll({ limit, page, order, orderBy, search, }) {
        const filterObject = {};
        if (search) {
            filterObject.$or = [
                {
                    brand: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    yearBuild: search ? (Number(search) ? +search : 0) : 0,
                },
                {
                    price: search ? (Number(search) ? +search : 0) : 0,
                },
                {
                    _ownerId: (0, mongoose_1.isObjectIdOrHexString)(search) ? search : null,
                },
            ];
        }
        const sortObject = {};
        sortObject[orderBy] = order;
        const cars = await car_model_1.CarModel.find(filterObject)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortObject);
        const total = await car_model_1.CarModel.countDocuments(filterObject);
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
