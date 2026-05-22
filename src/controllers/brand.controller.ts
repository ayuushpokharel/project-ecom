import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Brand from "../models/brand.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
    deleteFileFromCloudinary,
    sendFileToCLoudinary,
} from "../utils/cloudinary.utils";

//! get all brands
export const getBrands = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const filter = {};
        //* get all brands
        const brands = await Brand.find(filter);

        //* success response
        sendResponse(res, {
            message: "all brands fetched",
            data: brands,
            statusCode: 200,
        });
    },
);

//! get by id
export const getBrandById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        //*  brand id
        const { id } = req.params;

        //* database query
        const brand = await Brand.findOne({ _id: id });

        //* not found error
        if (!brand) {
            throw new AppError("brand not found", 404);
        }

        //* success response
        sendResponse(res, {
            message: `Brand with id : ${id} fetched successfully`,
            data: brand,
            statusCode: 200,
        });
    },
);

//! create brand
export const createBrand = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        //* create brand
        const { name } = req.body;

        //* get brand logo
        const image = req.file as Express.Multer.File;

        //* db query
        const brand = await Brand.create({ name });

        if (!name) {
            throw new AppError("name is required", 400);
        }

        //* handle logo image
        if (image) {
            const { path, public_id } = await sendFileToCLoudinary(
                image,
                "/brand_logo",
            );
            brand.brand_logo = { path, public_id };
        }

        //* success response
        sendResponse(res, {
            message: "brand created successfully",
            data: brand,
            statusCode: 200,
        });
    },
);

//! update brand
export const updateBrand = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        //* get id
        const { id } = req.params;
        //* get name
        const { name } = req.body;
        //* get brand logo
        const image = req.file as Express.Multer.File;

        //* db query
        const brand = await Brand.findOne({ _id: id });

        if (!brand) {
            throw new AppError("brand not found", 404);
        }

        //* update brand
        if (name) {
            brand.name = name;
        }

        //* update logo image
        if (image) {
            // delete old first if exists
            if (brand?.brand_logo?.public_id) {
                await deleteFileFromCloudinary(brand.brand_logo.public_id);
            }
            const { path, public_id } = await sendFileToCLoudinary(
                image,
                "/brand_logo",
            );
            brand.brand_logo = { path, public_id };
        }

        //* save brand
        await brand.save();

        //* success response
        sendResponse(res, {
            message: "brand updated successfully",
            data: brand,
            statusCode: 200,
        });
    },
);

//! delete brand
export const deleteBrand = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        //* get brand
        const { id } = req.params;

        //* db query
        const brand = Brand.findByIdAndDelete(id);

        //* brand not found
        if (!brand) {
            throw new AppError("brand not found", 404);
        }

        //* success response
        sendResponse(res, {
            message: "brand deleted successfully",
            statusCode: 200,
        });
    },
);
