import { Request, Response } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { generateToken } from "../utils/jwt.utils";
import {
    deleteFileFromCloudinary,
    sendFileToCLoudinary,
} from "../utils/cloudinary.utils";
import ENV_CONFIG from "../config/env.config";

//! folder
const folder = "/profile_image";

//! register
export const register = catchAsync(async (req: Request, res: Response) => {
    const { full_name, email, password, phone } = req.body;

    const image = req.file as Express.Multer.File;

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
    if (image) {
        const { path, public_id } = await sendFileToCLoudinary(image, folder);
        user.profile_image = { path, public_id };
    }

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

    //* send access token in cookie
    res.cookie("access_token", access_token, {
        httpOnly: ENV_CONFIG.node_env === "development" ? false : true,
        maxAge: Number(ENV_CONFIG.cookie_expiry) * 24 * 60 * 60 * 1000,
        secure: ENV_CONFIG.node_env === "development" ? false : true,
        sameSite: ENV_CONFIG.node_env === "development" ? "lax" : "none",
    });

    //! success response
    sendResponse(res, {
        message: "Login Successful",
        data: {
            user,
            access_token,
        },
        statusCode: 200,
    });
});

//! update profile

//? update profile picture only
export const updateProfilePicture = catchAsync(
    async (req: Request, res: Response) => {
        //* get id and file
        const { id } = req.params;
        const image = req.file as Express.Multer.File;

        //* db query -> find user
        const user = await User.findOne({ _id: id });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        //* delete old image from cloudinary if exists
        if (user?.profile_image?.public_id) {
            await deleteFileFromCloudinary(user.profile_image.public_id);
        }

        //* upload image to cloudinary
        const { path, public_id } = await sendFileToCLoudinary(image, folder);

        //* assign new image to user
        user.profile_image = {
            path,
            public_id,
        };

        //* save user
        await user.save();

        //* success response
        sendResponse(res, {
            message: "Profile picture updated",
            data: user,
            statusCode: 200,
        });
    },
);

//? update whole profile details
export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    //* get id and body
    const { id } = req.params;
    const { full_name, phone } = req.body;

    //* db query
    const user = await User.findById({ _id: id });
    if (!user) {
        throw new AppError("User not found", 404);
    }

    //* update user
    if (full_name) user.full_name = full_name;
    if (phone) user.phone = phone;

    //* update image
    if (req.file) {
        // delete old first
        if (user?.profile_image?.public_id) {
            await deleteFileFromCloudinary(user.profile_image.public_id);
        }
        const { path, public_id } = await sendFileToCLoudinary(
            req.file,
            folder,
        );
        user.profile_image = { path, public_id };
    }

    //* save user
    await user.save();

    //* success response
    sendResponse(res, {
        message: "Profile updated",
        data: user,
        statusCode: 200,
    });
});

//! get profile
export const getProfile = catchAsync(async (req: Request, res: Response) => {
    //* get id from params
    const { id } = req.params;

    //* db query
    const user = await User.findById(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    //* success response
    sendResponse(res, {
        message: "Profile fetched",
        data: user,
        statusCode: 200,
    });
});

//! change password
export const changePassword = catchAsync(
    async (req: Request, res: Response) => {
        //* get id
        const { id } = req.params;

        //* get old and new password
        const { old_password, new_password } = req.body;

        //* validate fields
        if (!old_password) {
            throw new AppError("Old password is required", 400);
        }
        if (!new_password) {
            throw new AppError("New password is required", 400);
        }

        //* db query
        const user = await User.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        //! compare old password
        const isMatch = await comparePassword(old_password, user.password);
        if (!isMatch) {
            throw new AppError("Old password is incorrect", 401);
        }

        //* hash new password
        const hash = await hashPassword(new_password);
        user.password = hash;

        //* save user
        await user.save();

        //* success response
        sendResponse(res, {
            message: "Password changed successfully",
            data: null,
            statusCode: 200,
        });
    },
);
