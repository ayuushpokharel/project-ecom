"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
//! generate token
const generateToken = (payLoad) => {
    try {
        const access_token = jsonwebtoken_1.default.sign(payLoad, env_config_1.default.jwt_secret, {
            expiresIn: env_config_1.default.jwt_expiry,
        });
        return access_token;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.generateToken = generateToken;
//! verify token
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_config_1.default.jwt_secret);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.verifyToken = verifyToken;
