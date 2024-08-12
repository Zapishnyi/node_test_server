"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const node_crypto_1 = require("node:crypto");
const node_path_1 = __importDefault(require("node:path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("../configs/config");
class S3Service {
    s3Client;
    constructor(s3Client = new client_s3_1.S3Client({
        region: config_1.config.AWS_REGION,
        credentials: {
            accessKeyId: config_1.config.AWS_ID,
            secretAccessKey: config_1.config.AWS_ACCESS_KEY,
        },
    })) {
        this.s3Client = s3Client;
    }
    async uploadFile(dirName, _userId, file) {
        const filePath = `${dirName}/${_userId}/${(0, node_crypto_1.randomUUID)()}${node_path_1.default.extname(file.name)}`;
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: config_1.config.AWS_BUCKET_NAME,
            Key: filePath,
            Body: file.data,
            ACL: config_1.config.AWS_S3_ACL,
            ContentType: file.mimetype,
        }));
        return filePath;
    }
    async deleteFile(pathToFile) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: config_1.config.AWS_BUCKET_NAME,
            Key: pathToFile,
        }));
    }
}
exports.s3Service = new S3Service();
