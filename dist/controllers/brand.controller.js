"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrandById = exports.getBrands = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const brand_model_1 = __importDefault(require("../models/brand.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const folder = "/brand_logo";
//! get all brands
exports.getBrands = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const filter = {};
    //* get all brands
    const brands = await brand_model_1.default.find(filter);
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "all brands fetched",
        data: brands,
        statusCode: 200,
    });
});
//! get by id
exports.getBrandById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //*  brand id
    const { id } = req.params;
    //* database query
    const brand = await brand_model_1.default.findOne({ _id: id });
    //* not found error
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Brand with id : ${id} fetched successfully`,
        data: brand,
        statusCode: 200,
    });
});
//! create brand
exports.createBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //* create brand
    const { name } = req.body;
    //* get brand logo
    const image = req.file;
    //* db query
    const brand = await brand_model_1.default.create({ name });
    if (!name) {
        throw new appError_utils_1.default("name is required", 400);
    }
    //* handle logo image
    if (image) {
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
        brand.brand_logo = { path, public_id };
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand created successfully",
        data: brand,
        statusCode: 200,
    });
});
//! update brand
exports.updateBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //* get id
    const { id } = req.params;
    //* get name
    const { name } = req.body;
    //* get brand logo
    const image = req.file;
    //* db query
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    //* update brand
    if (name) {
        brand.name = name;
    }
    //* update logo image
    if (image) {
        // delete old first if exists
        if (brand?.brand_logo?.public_id) {
            await (0, cloudinary_utils_1.deleteFileFromCloudinary)(brand.brand_logo.public_id);
        }
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
        brand.brand_logo = { path, public_id };
    }
    //* save brand
    await brand.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand updated successfully",
        data: brand,
        statusCode: 200,
    });
});
//! delete brand
exports.deleteBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //* get brand
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    //* brand not found
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    //* delete logo from cloud
    if (brand.brand_logo?.public_id) {
        await (0, cloudinary_utils_1.deleteFileFromCloudinary)(brand.brand_logo.public_id);
    }
    //* delete brand
    await brand.deleteOne({ _id: id });
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "brand deleted successfully",
        statusCode: 200,
    });
});
