"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const image_directory_name_enum_1 = require("../enums/image-directory-name.enum");
const auth_token_repository_1 = require("../repositories/auth_token.repository");
const user_repository_1 = require("../repositories/user.repository");
const s3_service_1 = require("./s3.service");
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
    async updateOne(_userId, dto, returnType, avatar, oldAvatar) {
        if (avatar) {
            if (oldAvatar) {
                await s3_service_1.s3Service.deleteFile(oldAvatar);
            }
            const avatarPath = await s3_service_1.s3Service.uploadFile(image_directory_name_enum_1.ImageDirectoryNameEnum.avatar, _userId, avatar);
            dto = { ...dto, avatar: avatarPath };
        }
        return await user_repository_1.userRepository.updateOne(_userId, dto, returnType);
    }
    async deleteKeys(userId, dto, returnType, avatar) {
        const dtoToUpdate = {
            $unset: Object.fromEntries(Object.keys(dto).map((e) => [e, "1"])),
        };
        if (Object.keys(dto).includes("avatar") && avatar) {
            await s3_service_1.s3Service.deleteFile(avatar);
        }
        return await user_repository_1.userRepository.updateOne(userId, dtoToUpdate, returnType);
    }
    async deleteOne(_userId) {
        await auth_token_repository_1.authTokenRepository.deleteAll(_userId);
        await auth_token_repository_1.authTokenRepository.deleteAll(_userId);
        return await user_repository_1.userRepository.deleteOne(_userId);
    }
}
exports.userServices = new UserServices();
