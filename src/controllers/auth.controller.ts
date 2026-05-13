import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

//! register
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { full_name, email, password, phone } = req.body;
        if (!full_name) {
            const error: any = new Error("full_name is required");
            error.statusCode = 400;
            error.status = "fail";
            throw error;
        }
        if (!email) {
            const error: any = new Error("email is required");
            error.statusCode = 400;
            error.status = "fail";
            throw error;
        }
        if (!password) {
            const error: any = new Error("password is required");
            error.statusCode = 400;
            error.status = "fail";
            throw error;
        }

        //* create User instance
        const user = new User({ full_name, email, password, phone });

        //! hanlde profile image

        //* save user
        await user.save();

        //* success response
        res.status(201).json({
            message: "Account created",
            data: user,
            success: true,
            status: "success",
        });
    } catch (error: any) {
        next({
            message: error?.message || "Something went wrong",
            status: error?.status || "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! login

//! update profile

//! get profile

//! change password
