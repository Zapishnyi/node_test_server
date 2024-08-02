"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    APP_PORT: Number(process.env.APP_PORT),
    APP_HOST: process.env.APP_HOST,
    MONGO_URI: process.env.MONGO_URI,
    FRONT_END_URL: process.env.FRONT_URL,
    JWT_ACCESS: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_ACTION: process.env.JWT_ACTION_SECRET,
    JWT_ACTION_EXP: process.env.JWT_ACTION_EXPIRES_IN,
    SMTP_SERVER_NAME: process.env.SMTP_SERVER,
    SMTP_PORT: Number(process.env.SMTP_PORT),
    SMTP_ADDRESS: process.env.SMTP_EMAIL,
    IMAP: process.env.IMAP_PASS,
};
