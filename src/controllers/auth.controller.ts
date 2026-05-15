import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";

//! register
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { full_name, email, password, phone } = req.body;
        if (!full_name) {
            // const error: any = new Error("full_name is required");
            // error.statusCode = 400;
            // error.status = "fail";
            // throw error;
            throw new AppError("Full Name is required", 400);
        }
        if (!email) {
            throw new AppError("email is required", 400);
        }
        if (!password) {
            throw new AppError("password is required", 400);
        }

        //* create User instance
        const user = new User({ full_name, email, password, phone });

        //! handle profile image

        //* save user
        await user.save();

        //* success response
        // res.status(201).json({
        //     message: "Account created",
        //     data: user,
        //     success: true,
        //     status: "success",
        // });
        sendResponse(res, {
            message: "Account created",
            data: user,
            statusCode: 201,
        });
    } catch (error: any) {
        next(
            // {
            // message: error?.message || "Something went wrong",
            // status: error?.status || "error",
            // success: false,
            // data: null,
            // statusCode: error?.statusCode || 500,
            // }
            error,
        );
    }
};

//! login
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { email, password } = req.body;

        //* validate email and password
        if (!email) {
            throw new AppError("email is required", 400);
        }
        if (!password) {
            throw new AppError("password is required", 400);
        }

        //! find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        //! compare password with input password
        const isMatch = password === user.password;
        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        //! success response
        sendResponse(res, {
            message: "Login Successful",
            data: user,
            statusCode: 201,
        });
    } catch (error: any) {
        next(error);
    }
};

// todo : generate access token

//! update profile
// const userId = (req as any).user?.id;
// const { full_name, phone } = req.body;

//! get profile

//! change password
