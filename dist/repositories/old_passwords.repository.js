"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oldPasswordsRepository = void 0;
const oldPasswords_model_1 = require("../models/oldPasswords.model");
class OldPasswordsRepository {
    async create(password, _userId) {
        return await oldPasswords_model_1.oldPasswordModel.create({
            password,
            _userId,
        });
    }
    async findManyByParams(params) {
        return await oldPasswords_model_1.oldPasswordModel.find(params);
    }
    async findOneByParams(params) {
        return await oldPasswords_model_1.oldPasswordModel.findOne(params);
    }
    async deleteOneByParams(params) {
        await oldPasswords_model_1.oldPasswordModel.findOneAndDelete(params);
    }
    async deleteManyByParams(params) {
        await oldPasswords_model_1.oldPasswordModel.deleteMany(params);
    }
}
exports.oldPasswordsRepository = new OldPasswordsRepository();
