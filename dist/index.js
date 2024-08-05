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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./configs/config");
const cronStack_1 = require("./crons/cronStack");
const auth_router_1 = require("./routers/auth.router");
const car_router_1 = require("./routers/car.router");
const user_router_1 = require("./routers/user.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/users", user_router_1.userRouter);
app.use("/cars", car_router_1.carRouter);
app.use("/auth", auth_router_1.authRouter);
app.use("*", (err, req, res, next) => {
    console.log(err);
    if (err.errorResponse?.code && err.errorResponse?.code === 11000) {
        res
            .status(409)
            .json(`Such a ${Object.keys(err.errorResponse.keyValue)} is already exist`);
    }
    else {
        res.status(err.status || 500).json(err.message);
    }
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception error:", err.message, err.stack);
    process.exit(1);
});
app.listen(config_1.config.APP_PORT, config_1.config.APP_HOST, async () => {
    await mongoose.connect(config_1.config.MONGO_URI);
    console.log(`server started at port ${config_1.config.APP_PORT} `);
    (0, cronStack_1.jobRunner)();
});
