"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategories = exports.updateCategories = exports.createCategories = exports.getCategoriesById = exports.getCategories = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const folder = "/category_image";
//! get all categories
exports.getCategories = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const filter = {};
    //* get all categories
    const categories = await category_model_1.default.find(filter);
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "all categories fetched",
        data: categories,
        statusCode: 200,
    });
});
//! get by id
exports.getCategoriesById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* category id
    const { id } = req.params;
    //* database query
    const category = await category_model_1.default.findOne({ _id: id });
    //* not found error
    if (!category)
        throw new appError_utils_1.default("Category not found", 404);
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `category ${id} fetched successfully`,
        data: category,
        statusCode: 200,
    });
});
//! create
exports.createCategories = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* create category
    const { name, description } = req.body;
    //* get category image
    const image = req.file;
    //*db query
    const category = await category_model_1.default.create({ name, description });
    if (!name)
        throw new appError_utils_1.default("name is required", 400);
    //* handle category image
    if (image) {
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
        category.category_image = { path, public_id };
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "category is created successfully",
        data: category,
        statusCode: 201,
    });
});
//! update by id
exports.updateCategories = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    //* get id and body
    const { id } = req.params;
    const { name, description } = req.body;
    //* get category image
    const image = req.file;
    //*db query
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_1.default("category not found", 404);
    //* update category
    if (name) {
        category.name = name;
    }
    if (description) {
        category.description = description;
    }
    //* delete old image from cloudinary if exists
    if (image) {
        if (category?.category_image?.public_id) {
            await (0, cloudinary_utils_1.deleteFileFromCloudinary)(category.category_image.public_id);
        }
    }
    //* update category image
    if (image) {
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(image, folder);
        category.category_image = { path, public_id };
    }
    //* save category
    await category.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "category is updated successfully",
        data: category,
        statusCode: 200,
    });
});
//! remove category
exports.removeCategories = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_1.default("Category not found", 404);
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(category.category_image.public_id);
    await category.deleteOne({ _id: id });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Category deleted successfully",
        data: null,
        statusCode: 200,
    });
});
