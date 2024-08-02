"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserServices {
    async findAll() {
        return await user_repository_1.userRepository.findAll();
    }
    async findOneById(userId) {
        return await user_repository_1.userRepository.findOneById(userId);
    }
    async findOneByParam(param) {
        return await user_repository_1.userRepository.findOneByParam(param);
    }
    async findManyByParam(param) {
        return await user_repository_1.userRepository.findManyByParam(param);
    }
    async createOne(newUser) {
        return await user_repository_1.userRepository.createOne(newUser);
    }
    async updateOne(userId, dto, returnType) {
        return await user_repository_1.userRepository.updateOne(userId, dto, returnType);
    }
    async deleteOne(userId) {
        return await user_repository_1.userRepository.deleteOne(userId);
    }
}
exports.userServices = new UserServices();
