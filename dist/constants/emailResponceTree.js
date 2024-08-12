"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailResponseTree = void 0;
const emailType_enum_1 = require("../enums/emailType.enum");
exports.emailResponseTree = {
    [emailType_enum_1.EmailTypeEnum.WELCOME]: {
        subject: "Welcome",
        template: "welcome",
    },
    [emailType_enum_1.EmailTypeEnum.LOG_OUT]: {
        subject: "Hope see you soon",
        template: "log_out",
    },
    [emailType_enum_1.EmailTypeEnum.FORGOT_PASSWORD]: {
        subject: "Password recovery",
        template: "forgot_password",
    },
    [emailType_enum_1.EmailTypeEnum.PASSWORD_CHANGED]: {
        subject: "Password changed",
        template: "password_changed",
    },
    [emailType_enum_1.EmailTypeEnum.REMIND]: {
        subject: "You've been away for a while!",
        template: "remind",
    },
};
