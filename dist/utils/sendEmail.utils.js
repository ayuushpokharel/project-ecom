"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../config/env.config"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const sendEmail = async ({ to, subject, text, html, cc, bcc, attachments, }) => {
    try {
        const mailOptions = {
            to: to,
            from: `Project Ecommerce <${env_config_1.default.smtp_user}>`,
            subject: subject,
            html: html,
        };
        if (text) {
            mailOptions["text"] = text;
        }
        if (cc) {
            mailOptions["cc"] = cc;
        }
        if (bcc) {
            mailOptions["bcc"] = bcc;
        }
        if (attachments) {
            mailOptions["attachments"] = attachments;
        }
        await nodemailer_config_1.default.sendMail(mailOptions);
        return true;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.default = sendEmail;
