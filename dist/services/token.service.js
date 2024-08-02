"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenServices = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const tokenType_enum_1 = require("../enums/tokenType.enum");
const api_error_1 = require("../errors/api.error");
const action_token_repository_1 = require("../repositories/action_token.repository");
const auth_token_repository_1 = require("../repositories/auth_token.repository");
class TokenServices {
    generateToken(payload, type) {
        return jwt.sign(payload, config_1.config[type], {
            expiresIn: config_1.config[`${type}_EXP`],
        });
    }
    async checkToken(token, tokenType) {
        switch (tokenType) {
            case "refresh" || "access": {
                if (!(await auth_token_repository_1.authTokenRepository.findOne(token))) {
                    throw new api_error_1.ApiError("Authentication token is missing.", 401);
                }
                break;
            }
            case "action": {
                if (!(await action_token_repository_1.actionTokenRepository.findOne(token))) {
                    throw new api_error_1.ApiError("Action token is missing.", 401);
                }
                break;
            }
        }
        return jwt.verify(token, config_1.config[tokenType_enum_1.TokenEnum[tokenType]]);
    }
}
exports.tokenServices = new TokenServices();
