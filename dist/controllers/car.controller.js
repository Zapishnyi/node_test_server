"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const car_service_1 = require("../services/car.service");
class CarController {
    async findAll(req, res, next) {
        try {
            const query = req.query;
            res.status(200).json(await car_service_1.carServices.findAll(query));
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            res.status(200).json(await car_service_1.carServices.findOne(req.params.id));
        }
        catch (err) {
            next(err);
        }
    }
    async addOne(req, res, next) {
        try {
            res.status(201).json(await car_service_1.carServices.createOne({
                ...req.body,
                _ownerId: res.locals._userId,
            }));
        }
        catch (err) {
            next(err);
        }
    }
    async updateOne(req, res, next) {
        try {
            res
                .status(200)
                .json(await car_service_1.carServices.updateOne(req.params.id, req.body));
        }
        catch (err) {
            next(err);
        }
    }
    async replaceOne(req, res, next) {
        try {
            res
                .status(200)
                .json(await car_service_1.carServices.replaceOne(req.params.id, req.body));
        }
        catch (err) {
            next(err);
        }
    }
    async deleteOne(req, res, next) {
        try {
            await car_service_1.carServices.deleteOne(req.params.id);
            res.status(200).json(`User with ID ${req.params.id} successful deleted`);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.carController = new CarController();
