"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const config_1 = require("../configs/config");
const action_type_enum_1 = require("../enums/action-type.enum");
const email_type_enum_1 = require("../enums/email-type.enum");
const returnDocumentType_enum_1 = require("../enums/returnDocumentType.enum");
const action_token_repository_1 = require("../repositories/action_token.repository");
const auth_token_repository_1 = require("../repositories/auth_token.repository");
const old_passwords_repository_1 = require("../repositories/old_passwords.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("./email.service");
const hash_service_1 = require("./hash.service");
const user_service_1 = require("./user.service");
class AuthServices {
    async singUp(dto) {
        const userCreated = await user_repository_1.userRepository.createOne({
            ...dto,
            password: await hash_service_1.hashService.hash(dto.password),
        });
        await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.WELCOME, dto.email, {
            name: dto.userName,
            actionToken: (await action_token_repository_1.actionTokenRepository.create(userCreated._id, action_type_enum_1.ActionTypeEnum.email_verify)).action,
            frontUrl: config_1.config.FRONT_END_URL,
        });
        return userCreated;
    }
    async forgotPassword(user) {
        await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.FORGOT_PASSWORD, user.email, {
            name: user.userName,
            actionToken: (await action_token_repository_1.actionTokenRepository.create(user._id, action_type_enum_1.ActionTypeEnum.password_renew)).action,
            frontUrl: config_1.config.FRONT_END_URL,
        });
    }
    async renewPassword(_userId, dto, token) {
        const newPassword = await hash_service_1.hashService.hash(dto.password);
        const userOld = await user_service_1.userServices.updateOne(_userId, {
            password: newPassword,
        }, returnDocumentType_enum_1.ReturnDocumentTypeEnum.Before);
        if (userOld) {
            await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.PASSWORD_CHANGED, userOld.email, {
                name: userOld.userName,
                frontUrl: config_1.config.FRONT_END_URL,
            });
            await old_passwords_repository_1.oldPasswordsRepository.create(userOld.password, _userId);
            await action_token_repository_1.actionTokenRepository.deleteOne(token);
            await auth_token_repository_1.authTokenRepository.deleteAll(_userId);
            userOld.password = newPassword;
        }
        return userOld;
    }
    async login(userId) {
        return await auth_token_repository_1.authTokenRepository.create(userId);
    }
    async verify(userId, dto, actionToken) {
        const userUpdated = await user_service_1.userServices.updateOne(userId, dto, returnDocumentType_enum_1.ReturnDocumentTypeEnum.After);
        await action_token_repository_1.actionTokenRepository.deleteOne(actionToken);
        return userUpdated;
    }
    async refresh(userId, token) {
        await auth_token_repository_1.authTokenRepository.deleteOne(token);
        return await auth_token_repository_1.authTokenRepository.create(userId);
    }
    async log_outCurrent(token, userId) {
        await auth_token_repository_1.authTokenRepository.deleteOne(token);
        const user = await user_service_1.userServices.findOneById(userId);
        if (user) {
            await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.LOG_OUT, user.email, {
                name: user.userName,
                frontUrl: config_1.config.FRONT_END_URL,
            });
        }
    }
    async log_outAll(userId) {
        await auth_token_repository_1.authTokenRepository.deleteAll(userId);
        const user = await user_service_1.userServices.findOneById(userId);
        if (user) {
            await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.LOG_OUT, user.email, {
                name: user.userName,
                frontUrl: config_1.config.FRONT_END_URL,
            });
        }
    }
}
exports.authServices = new AuthServices();
