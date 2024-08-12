"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const noIdFound_1 = require("../errors/noIdFound");
const user_model_1 = require("../models/user.model");
class UserRepository {
    async findAll({ page, limit, order, orderBy, search, }) {
        const filterObject = {};
        if (search) {
            filterObject.$or = [
                {
                    userName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    role: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    age: search ? (Number(search) ? +search : 0) : 0,
                },
                {
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        const sortObject = {};
        sortObject[orderBy] = order;
        const users = await user_model_1.UserModel.find(filterObject)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortObject);
        const total = await user_model_1.UserModel.countDocuments(filterObject);
        return [users, total];
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
