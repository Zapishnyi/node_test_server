"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCheck = void 0;
const fileAllowConfig_1 = require("../constants/fileAllowConfig");
const api_error_1 = require("../errors/api.error");
class FileCheck {
    fileCheck(fileType) {
        return async (req, res, next) => {
            try {
                if (req.files?.[fileType]) {
                    const file = req.files[fileType];
                    switch (true) {
                        case file.size > fileAllowConfig_1.allow[fileType].MAX_SIZE:
                            throw new api_error_1.ApiError(`File is greater than ${fileAllowConfig_1.allow[fileType].MAX_SIZE / 1024}kb `, 400);
                            break;
                        case !fileAllowConfig_1.allow[fileType].MIME_TYPES.includes(file.mimetype):
                            throw new api_error_1.ApiError("Invalid file type", 400);
                            break;
                    }
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.fileCheck = new FileCheck().fileCheck;
