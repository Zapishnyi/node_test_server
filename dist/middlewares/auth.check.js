"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const api_error_1 = require("../errors/api.error");
const old_passwords_repository_1 = require("../repositories/old_passwords.repository");
const hash_service_1 = require("../services/hash.service");
const token_service_1 = require("../services/token.service");
const user_service_1 = require("../services/user.service");
class AuthCheck {
    passwordCheckBeforeLogin() {
        return async (req, res, next) => {
            try {
                const user = await user_service_1.userServices.findOneByParam({
                    userName: req.body.userName,
                });
                if (user) {
                    res.locals._userId = user._id.toString();
                    res.locals.user = user;
                    if (!(await hash_service_1.hashService.compare(req.body.password, user.password))) {
                        throw new api_error_1.ApiError("Invalid credentials", 401);
                    }
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
    newPasswordCheck() {
        return async (req, res, next) => {
            try {
                const oldPasswordsArray = (await old_passwords_repository_1.oldPasswordsRepository.findManyByParams({
                    _userId: res.locals._userId,
                    createdAt: { $gt: (0, dayjs_1.default)().subtract(90, "days").toDate() },
                })) || [];
                if ([...oldPasswordsArray, { password: res.locals.user.password }].filter(async (e) => await hash_service_1.hashService.compare(req.body.password, e.password)).length) {
                    throw new api_error_1.ApiError("This password had been in use", 401);
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
    emailCheck() {
        return async (req, res, next) => {
            try {
                const email = req.body.email;
                const user = await user_service_1.userServices.findOneByParam({
                    email,
                });
                if (!user?.isVerified) {
                    throw new Error();
                }
                res.locals.user = user;
                next();
            }
            catch (err) {
                next(new api_error_1.ApiError("", 204));
            }
        };
    }
    tokenCheck(tokenType) {
        return async (req, res, next) => {
            try {
                const token = req.headers.authorization?.split(" ").pop();
                if (!token) {
                    throw new api_error_1.ApiError("Token is missing.", 401);
                }
                else {
                    res.locals._userId = (await token_service_1.tokenServices.checkToken(token, tokenType))._userId;
                    res.locals.token = token;
                }
                next();
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    err = new api_error_1.ApiError(err.message, 401);
                }
                next(err);
            }
        };
    }
    oldPasswordCheck() {
        return async (req, res, next) => {
            try {
                const user = await user_service_1.userServices.findOneById(res.locals._userId);
                if (user) {
                    if (!(await hash_service_1.hashService.compare(req.body.oldPassword, user.password))) {
                        throw new api_error_1.ApiError("Invalid credentials", 401);
                    }
                    res.locals.user = user;
                }
                next();
            }
            catch (err) {
                if (err) {
                }
                next(err);
            }
        };
    }
}
exports.auth = new AuthCheck();
