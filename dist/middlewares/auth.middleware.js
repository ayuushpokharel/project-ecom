"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const env_config_1 = __importDefault(require("../config/env.config"));
const jwt_utils_1 = require("../utils/jwt.utils");
const authenticate = (roles) => {
    return (req, res, next) => {
        try {
            //* get token from res cookie
            const cookies = req.cookies;
            const access_token = cookies["access_token"];
            if (!access_token) {
                throw new appError_utils_1.default("Unauthorized", 401);
            }
            //* verify token
            const decoded_data = (0, jwt_utils_1.verifyToken)(access_token);
            //* check if token is expired or not
            if (Date.now() > decoded_data.exp * 1000) {
                //? clear the cookie
                res.clearCookie("access_token", {
                    httpOnly: env_config_1.default.node_env === "development" ? false : true,
                    maxAge: Date.now(),
                    secure: env_config_1.default.node_env === "development" ? false : true,
                    sameSite: env_config_1.default.node_env === "development" ? "lax" : "none",
                });
                throw new appError_utils_1.default("Token expired", 401);
            }
            if (roles && !roles.includes(decoded_data.role)) {
                throw new appError_utils_1.default("Forbidden: Access Denied", 403);
            }
            //! add logged in user data to req object
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
