import { Request, Response } from "express";
import Category from "../models/category.model";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";

//! get all categories
export const getCategories = catchAsync(async (req: Request, res: Response) => {
    const filter = {};
    //* get all categories
    const categories = await Category.find(filter);

    //* success response
    sendResponse(res, {
        message: "all categories fetched",
        data: categories,
        statusCode: 200,
    });
});

//! get by id
export const getCategoriesById = catchAsync(
    async (req: Request, res: Response) => {
        //* category id
        const { id } = req.params;

        //* database query
        const category = await Category.findOne({ _id: id });

        //* not found error
        if (!category) throw new AppError("Category not found", 404);

        //* success response
        sendResponse(res, {
            message: `category ${id} fetched successfully`,
            data: category,
            statusCode: 200,
        });
    },
);

//! create
export const createCategories = catchAsync(
    async (req: Request, res: Response) => {
        //* create category
        const { name, description } = req.body;
        //*db query
        const category = await Category.create({ name, description });

        if (!name) throw new AppError("name is required", 400);

        //* success response
        sendResponse(res, {
            message: "category is created successfully",
            data: category,
            statusCode: 201,
        });
    },
);

//! update by id
export const updateCategories = catchAsync(
    async (req: Request, res: Response) => {
        //* get id and body
        const { id } = req.params;
        const { name, description } = req.body;
        //*db query
        const category = await Category.findOne({ _id: id });

        if (!category) throw new AppError("category not found", 404);

        //* update category
        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

        //* save category
        await category.save();

        //* success response
        sendResponse(res, {
            message: "category is updated successfully",
            data: category,
            statusCode: 200,
        });
    },
);

//! remove category
export const removeCategories = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const category = Category.findByIdAndDelete(id);
        if (!category) throw new AppError("Category not found", 404);
        sendResponse(res, {
            message: "User deleted successfully",
            data: null,
            statusCode: 200,
        });
    },
);
