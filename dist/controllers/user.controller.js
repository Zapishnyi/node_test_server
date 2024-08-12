"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const measuring_time_decorator_1 = require("../decorators/measuring_time.decorator");
const returnDocumentType_enum_1 = require("../enums/returnDocumentType.enum");
const presenter_1 = require("../presenters/presenter");
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res, next) {
        try {
            const query = req.query;
            res.status(200).json(await user_service_1.userServices.findAll(query));
        }
        catch (err) {
            next(err);
        }
    }
    async findOne(req, res, next) {
        try {
            res
                .status(200)
                .json((0, presenter_1.toPresentUser)(await user_service_1.userServices.findOneByParam({ _id: req.params.id })));
        }
        catch (err) {
            next(err);
        }
    }
    async findMe(req, res, next) {
        try {
            res
                .status(200)
                .json((0, presenter_1.toPresentUser)(await user_service_1.userServices.findOneByParam({ _id: res.locals._userId })));
        }
        catch (err) {
            next(err);
        }
    }
    async updateOne(req, res, next) {
        try {
            res
                .status(200)
                .json((0, presenter_1.toPresentUser)(await user_service_1.userServices.updateOne(res.locals._userId, req.body, returnDocumentType_enum_1.ReturnDocumentTypeEnum.After, req.files?.avatar, res.locals.user?.avatar)));
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
    async deleteKeysByParams(req, res, next) {
        try {
            res
                .status(200)
                .json((0, presenter_1.toPresentUser)(await user_service_1.userServices.deleteKeys(res.locals._userId, req.query, returnDocumentType_enum_1.ReturnDocumentTypeEnum.After, res.locals.user?.avatar)));
        }
        catch (err) {
            next(err);
        }
    }
}
__decorate([
    (0, measuring_time_decorator_1.MeasureExecutionTime)(";)"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
exports.userController = new UserController();
