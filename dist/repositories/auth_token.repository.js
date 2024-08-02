"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTokenRepository = void 0;
const tokenType_enum_1 = require("../enums/tokenType.enum");
const authToken_model_1 = require("../models/authToken.model");
const token_service_1 = require("../services/token.service");
class AuthTokenRepository {
    async create(_userId) {
        return await authToken_model_1.AuthTokenModel.create({
            access: token_service_1.tokenServices.generateToken({ _userId }, tokenType_enum_1.TokenEnum.access),
            refresh: token_service_1.tokenServices.generateToken({ _userId }, tokenType_enum_1.TokenEnum.refresh),
            _userId,
        });
    }
    async deleteOne(token) {
        await authToken_model_1.AuthTokenModel.findOneAndDelete({
            $or: [{ access: token }, { refresh: token }],
        });
    }
    async deleteOneByParams(params) {
        await authToken_model_1.AuthTokenModel.findOneAndDelete(params);
    }
    async deleteManyByParams(params) {
        await authToken_model_1.AuthTokenModel.deleteMany(params);
    }
    async findManyByParams(params) {
        return await authToken_model_1.AuthTokenModel.find(params);
    }
    async findOne(token) {
        return await authToken_model_1.AuthTokenModel.findOne({
            $or: [{ access: token }, { refresh: token }],
        });
    }
    async deleteAll(_userId) {
        await authToken_model_1.AuthTokenModel.deleteMany({ _userId });
    }
}
exports.authTokenRepository = new AuthTokenRepository();
