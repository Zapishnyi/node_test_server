"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const noIdFound_1 = require("../errors/noIdFound");
const user_model_1 = require("../models/user.model");
class UserRepository {
    async findAll() {
        return await user_model_1.UserModel.find();
    }
    async createOne(dto) {
        return await user_model_1.UserModel.create(dto);
    }
    async findOneById(id) {
        const result = await user_model_1.UserModel.findById(id);
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
    async findOneByParam(param) {
        const result = await user_model_1.UserModel.findOne(param);
        (0, noIdFound_1.noFoundCheck)(Object.keys(param)[0], result);
        return result;
    }
    async findManyByParam(param) {
        return await user_model_1.UserModel.find(param);
    }
    async updateOne(id, dto, returnType) {
        const result = await user_model_1.UserModel.findByIdAndUpdate(id, dto, { returnDocument: returnType });
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
    async deleteOne(id) {
        const result = await user_model_1.UserModel.findByIdAndDelete(id);
        (0, noIdFound_1.noFoundCheck)(id, result);
        return result;
    }
}
exports.userRepository = new UserRepository();
