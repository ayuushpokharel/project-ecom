import { Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { generateToken } from "../utils/jwt.utils";

//! register
export const register = catchAsync(async (req: Request, res: Response) => {
    const { full_name, email, password, phone } = req.body;

    //* required field
    // if (!full_name) {
    // const error: any = new Error("full_name is required");
    // error.statusCode = 400;
    // error.status = "fail";
    // throw error;
    // }

    if (!full_name) {
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

    //* hash password
    const hash = await hashPassword(password);
    user.password = hash;

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
});

//! login
export const login = catchAsync(async (req: Request, res: Response) => {
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
    // const isMatch = password === user.password; // with no hashing
    const isMatch = await comparePassword(password, user.password); // after hashing

    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    //* generate access token => jwt -> json web token
    const payLoad = {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
    };
    const access_token = generateToken(payLoad);
    // console.log(access_token);

    //! success response
    sendResponse(res, {
        message: "Login Successful",
        data: {
            user,
            access_token,
        },
        statusCode: 201,
    });
});

//! update profile
// const userId = (req as any).user?.id;
// const { full_name, phone } = req.body;
// const update = catchAsync()

//! get profile

//! change password
