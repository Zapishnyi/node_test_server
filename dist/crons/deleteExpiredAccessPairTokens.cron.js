"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpiredAccessPairTokens = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const config_1 = require("../configs/config");
const time_helper_1 = require("../helpers/time.helper");
const auth_token_repository_1 = require("../repositories/auth_token.repository");
const expiredTokensDelete = async () => {
    try {
        await auth_token_repository_1.authTokenRepository.deleteManyByParams({
            createdAt: { $lte: (0, time_helper_1.expTimeConverter)(config_1.config.JWT_REFRESH_EXP) },
        });
        console.log(`ExpiredTokens Deleted at ${(0, dayjs_1.default)().format("DD-MM-YY, hh:mm:ss")}`);
    }
    catch (err) {
        console.log(`${this} crone failed with error:`, err);
    }
};
exports.deleteExpiredAccessPairTokens = new cron_1.CronJob("59 59 3 * * *  ", expiredTokensDelete);
