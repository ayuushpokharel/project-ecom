import jwt from "jsonwebtoken";
import { Role } from "../types/enum.types";
import mongoose from "mongoose";
import ENV_CONFIG from "../config/env.config";

type TPayLoad = {
    _id: mongoose.Types.ObjectId;
    full_name?: string;
    role: Role;
    email: string;
};
//!
export const generateToken = (payLoad: TPayLoad) => {
    try {
        const access_token = jwt.sign(payLoad, ENV_CONFIG.jwt_secret, {
            expiresIn: ENV_CONFIG.jwt_expiry as any,
        });
        return access_token;
    } catch (error: any) {
        console.log(error);
        throw error;
    }
};
