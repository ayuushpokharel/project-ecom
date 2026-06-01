"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = __importDefault(require("./env.config"));
//! transporter
const transporter = nodemailer_1.default.createTransport({
    host: env_config_1.default.smtp_host,
    service: env_config_1.default.smtp_service,
    port: Number(env_config_1.default.smtp_port) ?? 587,
    secure: Number(env_config_1.default.smtp_port) === 465, // true for 465, false for other ports
    auth: {
        user: env_config_1.default.smtp_user,
        pass: env_config_1.default.smtp_pass,
    },
});
exports.default = transporter;
