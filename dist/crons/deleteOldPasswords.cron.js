"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldPasswords = void 0;
const cron_1 = require("cron");
const dayjs_1 = __importDefault(require("dayjs"));
const old_passwords_repository_1 = require("../repositories/old_passwords.repository");
const DeleteOldPasswords = async () => {
    try {
        await old_passwords_repository_1.oldPasswordsRepository.deleteManyByParams({
            createdAt: { $lte: (0, dayjs_1.default)().subtract(90, "days").toDate() },
        });
        console.log(`Old Passwords are deleted at ${(0, dayjs_1.default)().format("DD-MM-YY, hh:mm:ss")}`);
    }
    catch (err) {
        console.log(`${this} crone failed with error:`, err);
    }
};
exports.deleteOldPasswords = new cron_1.CronJob("59 54 3 * * *  ", DeleteOldPasswords);
