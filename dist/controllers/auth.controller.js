"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async singUp(req, res, next) {
        try {
            res.status(200).json(await auth_service_1.authServices.singUp(req.body));
        }
        catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            res.status(200).json(await auth_service_1.authServices.login(res.locals._userId));
        }
        catch (err) {
            next(err);
        }
    }
    async verify(req, res, next) {
        try {
            res
                .status(200)
                .json(await auth_service_1.authServices.verify(res.locals._userId, { isVerified: true }, res.locals.token));
        }
        catch (err) {
            next(err);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            await auth_service_1.authServices.forgotPassword(res.locals.user);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async renewPassword(req, res, next) {
        try {
            res
                .status(200)
                .json(await auth_service_1.authServices.renewPassword(res.locals._userId, req.body, res.locals.token));
        }
        catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            res
                .status(200)
                .json(await auth_service_1.authServices.refresh(res.locals._userId, res.locals.token));
        }
        catch (err) {
            next(err);
        }
    }
    async log_outCurrent(req, res, next) {
        try {
            await auth_service_1.authServices.log_outCurrent(res.locals.token, res.locals._userId);
            res.status(200).json("Logged out successfully");
        }
        catch (err) {
            next(err);
        }
    }
    async log_outAll(req, res, next) {
        try {
            await auth_service_1.authServices.log_outAll(res.locals._userId);
            res.status(200).json("Logged out successfully from all devices");
        }
        catch (err) {
            next(err);
        }
    }
}
exports.authController = new AuthController();
