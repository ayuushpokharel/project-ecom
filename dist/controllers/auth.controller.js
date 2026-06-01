"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getProfile = exports.updateProfile = exports.updateProfilePicture = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const jwt_utils_1 = require("../utils/jwt.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
const sendEmail_utils_1 = __importDefault(require("../utils/sendEmail.utils"));
const email_utils_1 = require("../utils/email.utils");
//! folder
const folder = "/profile_image";
//! register
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { full_name, email, password, phone } = req.body;
    const image = req.file;
    //* required field
    // if (!full_name) {
    // const error: any = new Error("full_name is required");
    // error.statusCode = 400;
    // error.status = "fail";
    // throw error;
    // }
    if (!full_name) {
        throw new appError_utils_1.default("Full Name is required", 400);
    }
    if (!email) {
        throw new appError_utils_1.default("email is required", 400);
    }
    if (!password) {
        throw new appError_utils_1.default("password is required", 400);
    }
    //* create User instance
    const user = new user_model_1.default({ full_name, email, password, phone });
    //* hash password
    const hash = await (0, bcrypt_utils_1.hashPassword)(password);
    user.password = hash;
    //! handle profile image
    if (image) {
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
        user.profile_image = { path, public_id };
    }
    //* save user
    await user.save();
    //* send mail to user
    await (0, sendEmail_utils_1.default)({
        to: user.email,
        subject: "Welcome to Project Ecommerce",
        text: `Hello ${user.full_name}, welcome to Project Ecommerce!`,
        html: (0, email_utils_1.getRegistrationSuccessEmailHtml)({
            name: user.full_name,
            dateTime: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            location: "Kathmandu, NP",
        }),
    });
    //* success response
    // res.status(201).json({
    //     message: "Account created",
    //     data: user,
    //     success: true,
    //     status: "success",
    // });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Account created",
        data: user,
        statusCode: 201,
    });
});
//! login
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    //* validate email and password
    if (!email) {
        throw new appError_utils_1.default("email is required", 400);
    }
    if (!password) {
        throw new appError_utils_1.default("password is required", 400);
    }
    //! find user by email
    const user = await user_model_1.default.findOne({ email: email });
    if (!user) {
        throw new appError_utils_1.default("Invalid email or password", 401);
    }
    //! compare password with input password
    // const isMatch = password === user.password; // with no hashing
    const isMatch = await (0, bcrypt_utils_1.comparePassword)(password, user.password); // after hashing
    if (!isMatch) {
        throw new appError_utils_1.default("Invalid email or password", 401);
    }
    //* generate access token => jwt -> json web token
    const payLoad = {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
    };
    const access_token = (0, jwt_utils_1.generateToken)(payLoad);
    // console.log(access_token);
    await (0, sendEmail_utils_1.default)({
        to: user.email,
        subject: "Welcome to Project Ecommerce",
        text: `Hello ${user.full_name}, welcome to Project Ecommerce!`,
        html: (0, email_utils_1.getLoginSuccessEmailHtml)({
            name: user.full_name,
            dateTime: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            location: "Kathmandu, NP",
        }),
    });
    //* send access token in cookie
    res.cookie("access_token", access_token, {
        httpOnly: env_config_1.default.node_env === "development" ? false : true,
        maxAge: Number(env_config_1.default.cookie_expiry) * 24 * 60 * 60 * 1000,
        secure: env_config_1.default.node_env === "development" ? false : true,
        sameSite: env_config_1.default.node_env === "development" ? "lax" : "none",
    });
    //! success response
    (0, sendResponse_utils_1.sendResponse)(res, {
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
exports.updateProfilePicture = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* get id and file
    // const { id } = req.params;
    const id = req.user?._id;
    const image = req.file;
    //* db query -> find user
    const user = await user_model_1.default.findOne({ _id: id });
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    //* delete old image from cloudinary if exists
    if (user?.profile_image?.public_id) {
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(user.profile_image.public_id);
    }
    //* upload image to cloudinary
    const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
    //* assign new image to user
    user.profile_image = {
        path,
        public_id,
    };
    //* save user
    await user.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Profile picture updated",
        data: user,
        statusCode: 200,
    });
});
//? update whole profile details
exports.updateProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* get id and body
    const id = req.user?._id;
    const { full_name, phone } = req.body;
    //* db query
    const user = await user_model_1.default.findById({ _id: id });
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    //* update user
    if (full_name)
        user.full_name = full_name;
    if (phone)
        user.phone = phone;
    //* update image
    if (req.file) {
        // delete old first
        if (user?.profile_image?.public_id) {
            await (0, cloudinary_utils_1.deleteFileFromCloudinary)(user.profile_image.public_id);
        }
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(req.file, folder);
        user.profile_image = { path, public_id };
    }
    //* save user
    await user.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Profile updated",
        data: user,
        statusCode: 200,
    });
});
//! get profile
exports.getProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* get id from params
    const id = req.user?._id;
    //* db query
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Profile fetched",
        data: user,
        statusCode: 200,
    });
});
//! change password
exports.changePassword = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* get id
    const id = req.user?._id;
    //* get old and new password
    const { old_password, new_password } = req.body;
    //* validate fields
    if (!old_password) {
        throw new appError_utils_1.default("Old password is required", 400);
    }
    if (!new_password) {
        throw new appError_utils_1.default("New password is required", 400);
    }
    //* db query
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    //! compare old password
    const isMatch = await (0, bcrypt_utils_1.comparePassword)(old_password, user.password);
    if (!isMatch) {
        throw new appError_utils_1.default("Old password is incorrect", 401);
    }
    //* hash new password
    const hash = await (0, bcrypt_utils_1.hashPassword)(new_password);
    user.password = hash;
    //* save user
    await user.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Password changed successfully",
        data: null,
        statusCode: 200,
    });
});
