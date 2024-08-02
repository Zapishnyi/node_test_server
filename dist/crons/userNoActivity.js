"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNoActivity = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = require("../configs/config");
const email_type_enum_1 = require("../enums/email-type.enum");
const auth_token_repository_1 = require("../repositories/auth_token.repository");
const user_repository_1 = require("../repositories/user.repository");
const email_service_1 = require("../services/email.service");
const UserNoActivity = async () => {
    try {
        const noActivityUsersId = (await auth_token_repository_1.authTokenRepository.findManyByParams({
            createdAt: {
                $lt: (0, dayjs_1.default)().subtract(5, "days").toDate(),
                $gt: (0, dayjs_1.default)().subtract(6, "days").toDate(),
            },
        }))?.map((e) => e._userId);
        if (noActivityUsersId) {
            for (const id of noActivityUsersId) {
                const user = await user_repository_1.userRepository.findOneById(id);
                if (user) {
                    await email_service_1.emailService.sendEmail(email_type_enum_1.EmailTypeEnum.REMIND, user.email, {
                        name: user.userName,
                        frontUrl: config_1.config.FRONT_END_URL,
                    });
                }
            }
        }
    }
    catch (err) {
        console.log(`${this} crone failed with error:`, err);
    }
};
exports.userNoActivity = new cron_1.CronJob("00 00 10 * * *  ", UserNoActivity);
