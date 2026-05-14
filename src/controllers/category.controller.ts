import { NextFunction, Request, Response } from "express";
import Category from "../models/category.model";

//! get all categories
export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const filter = {};
        //* get all categories
        const categories = await Category.find(filter);

        //* success response
        res.status(200).json({
            message: "All categories fetched successfully",
            data: categories,
            status: "success",
            success: true,
        });
    } catch (error: any) {
        next({
            message: error?.message || "something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! get by id
export const getCategoriesById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        //* category id
        const { id } = req.params;

        //* database query
        const category = await Category.findOne({ _id: id });

        //* not found error
        if (!category) {
            const error: any = new Error("category not found");
            error.statusCode = 404;
            error.status = false;
            throw error;
        }

        //* success response
        res.status(200).json({
            message: `category ${id} fetched successfully`,
            data: category,
            status: "success",
            success: true,
        });
    } catch (error: any) {
        next({
            message: error?.message || "something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! create
export const createCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        //* create category
        const { name, description } = req.body;
        //*db query
        const category = await Category.create({ name, description });

        if (!name) {
            const error: any = new Error("name is required");
            error.statusCode = 400;
            error.status = false;
            throw error;
        }

        //* success response
        res.status(200).json({
            message: "category is created successfully",
            data: category,
            success: true,
            status: "success",
        });
    } catch (error: any) {
        next({
            message: error?.message || "something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! update by id
export const updateCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        //* get id and body
        const { id } = req.params;
        const { name, description } = req.body;
        //*db query
        const category = await Category.findOne({ _id: id });

        if (!category) {
            const error: any = new Error("category not found");
            error.statusCode = 404;
            error.status = false;
            throw error;
        }

        //* update category
        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

        //* success response
        res.status(200).json({
            message: "category is updated successfully",
            data: category,
            success: true,
            status: "success",
        });
    } catch (error: any) {
        next({
            message: error?.message || "something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};

//! delete
export const deleteCategories = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const category = Category.findByIdAndDelete(id);
        if (!category) {
            const error: any = new Error("Category not found");
            error.statusCode = 404;
            error.status = false;
            throw error;
        }
        res.status(200).json({
            message: "User deleted successfully",
            success: true,
            status: "success",
        });
    } catch (error: any) {
        next({
            message: error?.message || "something went wrong",
            status: "error",
            success: false,
            data: null,
            statusCode: error?.statusCode || 500,
        });
    }
};
