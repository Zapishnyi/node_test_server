"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const node_path_1 = __importDefault(require("node:path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const config_1 = require("../configs/config");
const emailResponceTree_1 = require("../constants/emailResponceTree");
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: config_1.config.SMTP_SERVER_NAME,
            port: config_1.config.SMTP_PORT,
            secure: true,
            auth: {
                user: config_1.config.SMTP_ADDRESS,
                pass: config_1.config.IMAP,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                extname: ".hbs",
                partialsDir: node_path_1.default.join(process.cwd(), "src", "templates", "partials"),
                layoutsDir: node_path_1.default.join(process.cwd(), "src", "templates", "layouts"),
            },
            viewPath: node_path_1.default.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
        }));
    }
    async sendEmail(type, to, context) {
        const { subject, template } = emailResponceTree_1.emailResponseTree[type];
        const options = {
            from: config_1.config.SMTP_ADDRESS,
            to,
            subject,
            template,
            context,
        };
        await this.transporter.sendMail(options);
    }
}
exports.emailService = new EmailService();
