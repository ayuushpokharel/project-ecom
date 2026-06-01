"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getById = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// crud user
//! get all users
const getAll = async (req, res, next) => {
    try {
        const filter = {};
        //* get all users query
        const users = await user_model_1.default.find(filter);
        //* success response
        res.status(200).json({
            message: "All users fetched",
            data: users,
            success: true,
            status: "succcess",
        });
    }
    catch (error) {
        next({
            message: error?.message || "Something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
exports.getAll = getAll;
//! get by id
const getById = async (req, res, next) => {
    try {
        //* user id
        const { id } = req.params;
        //* db query
        const user = await user_model_1.default.findOne({ _id: id });
        //* user not found error
        if (!user) {
            const error = new Error("User not found ");
            error.statusCode = 404;
            error.status = "fail";
            throw error;
        }
        //* success response
        res.status(200).json({
            message: `User ${id} fetched`,
            data: user,
            success: true,
            status: "success",
        });
    }
    catch (error) {
        next({
            message: error?.message || "Something went wrong",
            status: error?.status || "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
exports.getById = getById;
//! Delete User
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_model_1.default.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            message: "User deleted successfully",
        });
    }
    catch (error) {
        next({
            message: error?.message || "Something went wrong",
            status: error?.status || "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
exports.deleteUser = deleteUser;
