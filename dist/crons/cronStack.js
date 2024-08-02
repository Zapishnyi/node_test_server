"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRunner = void 0;
const deleteExpiredAccessPairTokens_cron_1 = require("./deleteExpiredAccessPairTokens.cron");
const deleteOldPasswords_cron_1 = require("./deleteOldPasswords.cron");
const userNoActivity_1 = require("./userNoActivity");
const jobRunner = () => {
    deleteExpiredAccessPairTokens_cron_1.deleteExpiredAccessPairTokens.start();
    deleteOldPasswords_cron_1.deleteOldPasswords.start();
    userNoActivity_1.userNoActivity.start();
};
exports.jobRunner = jobRunner;
