"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTokenRepository = void 0;
const tokenType_enum_1 = require("../enums/tokenType.enum");
const actionTokem_model_1 = require("../models/actionTokem.model");
const token_service_1 = require("../services/token.service");
class ActionTokenRepository {
    async create(_userId, type) {
        return await actionTokem_model_1.ActionTokenModel.create({
            action: token_service_1.tokenServices.generateToken({ _userId }, tokenType_enum_1.TokenEnum.action),
            _userId,
            type,
        });
    }
    async deleteOne(token) {
        await actionTokem_model_1.ActionTokenModel.findOneAndDelete({ action: token });
    }
    async findOne(token) {
        return await actionTokem_model_1.ActionTokenModel.findOne({ action: token });
    }
}
exports.actionTokenRepository = new ActionTokenRepository();
