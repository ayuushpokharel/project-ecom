import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
//crud user

//! get all users
export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const filter = {};
        //* get all users query
        const users = await User.find(filter);

        //* success response
        res.status(200).json({
            message: "All users fetched",
            data: users,
            success: true,
            status: "success",
        });
    } catch (error: any) {
        next({
            message: error?.message || "Something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! get by id
export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        //* user id
        const { id } = req.params;

        //* db query
        const user = await User.findOne({ _id: id });

        //* user not found error
        if (!user) {
            const error: any = new Error("User not found");
            error.statusCode = 404;
            error.status = "fail";
            throw error;
        }

        //* status response
        res.status(200).json({
            message: "All users fetched",
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
