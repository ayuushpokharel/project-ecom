import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.utils";
import ENV_CONFIG from "../config/env.config";
import { verifyToken } from "../utils/jwt.utils";
import { Role } from "../types/enum.types";

export const authenticate = (roles?: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            //* get token from res cookie
            const cookies = req.cookies;
            const access_token = cookies["access_token"];
            if (!access_token) {
                throw new AppError("Unauthorized", 401);
            }

            //* verify token
            const decoded_data: any = verifyToken(access_token);

            //* check if token is expired or not

            if (Date.now() > decoded_data.exp * 1000) {
                //? clear the cookie
                res.clearCookie("access_token", {
                    httpOnly:
                        ENV_CONFIG.node_env === "development" ? false : true,
                    maxAge: Date.now(),
                    secure:
                        ENV_CONFIG.node_env === "development" ? false : true,
                    sameSite:
                        ENV_CONFIG.node_env === "development" ? "lax" : "none",
                });
                throw new AppError("Token expired", 401);
            }

            if (roles && !roles.includes(decoded_data.role)) {
                throw new AppError("Forbidden: Access Denied", 403);
            }
            next();
        } catch (error) {
            throw error;
        }
    };
};
