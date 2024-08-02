"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const returnDocumentType_enum_1 = require("../enums/returnDocumentType.enum");
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res, next) {
        try {
            res.status(200).json(await user_service_1.userServices.findAll());
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            res
                .status(200)
                .json(await user_service_1.userServices.findOneByParam({ _id: req.params.id }));
        }
        catch (err) {
            next(err);
        }
    }
    async findMe(req, res, next) {
        try {
            res
                .status(200)
                .json(await user_service_1.userServices.findOneByParam({ _id: res.locals.userId }));
        }
        catch (err) {
            next(err);
        }
    }
    async addOne(req, res, next) {
        try {
            res.status(201).json(await user_service_1.userServices.createOne(req.body));
        }
        catch (err) {
            next(err);
        }
    }
    async updateOne(req, res, next) {
        try {
            res
                .status(200)
                .json(await user_service_1.userServices.updateOne(res.locals._userId, req.body, returnDocumentType_enum_1.ReturnDocumentTypeEnum.After));
        }
        catch (err) {
            next(err);
        }
    }
    async deleteOne(req, res, next) {
        try {
            await user_service_1.userServices.deleteOne(req.params.id);
            res.status(200).json(`User with ID ${req.params.id} successful deleted`);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userController = new UserController();
