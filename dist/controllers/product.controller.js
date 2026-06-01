"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedProducts = exports.getNewProducts = exports.getByBrand = exports.getByCategory = exports.removeProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const category_model_1 = __importDefault(require("../models/category.model"));
const brand_model_1 = __importDefault(require("../models/brand.model"));
const folder = "/products";
//! get all products
exports.getProducts = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const filter = {};
    //* get all products
    const products = await product_model_1.default.find(filter);
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "All products fetched",
        data: products,
        statusCode: 200,
    });
});
//! get by id
exports.getProductById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //* get id
    const id = req.params;
    //* db query
    const product = await product_model_1.default.findOne({ _id: id });
    //* not found error
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product with id : ${id} fetched successfully`,
        data: product,
        statusCode: 200,
    });
});
//! create product
exports.createProduct = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    //* get body
    const { name, description, price, stock, category, brand, new_arrival, featured, } = req.body;
    //* get files from req.files
    const { cover_image, images } = req.files;
    //* validate required fields
    if (!name)
        throw new appError_utils_1.default("name is required", 400);
    if (!description)
        throw new appError_utils_1.default("description is required", 400);
    if (!price)
        throw new appError_utils_1.default("price is required", 400);
    if (!stock)
        throw new appError_utils_1.default("stock is required", 400);
    // if (!category) throw new AppError("category is required", 400);
    // if (!brand) throw new AppError("brand is required", 400);
    //* validate cover image
    if (!cover_image[0]) {
        throw new appError_utils_1.default("cover image is required", 400);
    }
    //* create product
    const product = new product_model_1.default({
        name,
        description,
        price,
        stock,
        new_arrival,
        featured,
    });
    const p_category = await category_model_1.default.findOne({ _id: category });
    const p_brand = await brand_model_1.default.findOne({ _id: brand });
    if (!p_category)
        throw new appError_utils_1.default("Invalid category", 400);
    if (!p_brand)
        throw new appError_utils_1.default("Invalid brand", 400);
    product.category = p_category._id;
    product.brand = p_brand._id;
    //* upload cover image to cloudinary
    const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(cover_image[0], folder);
    product.cover_image = {
        path,
        public_id,
    };
    //* upload multiple images to cloudinary
    if (images && Array.isArray(images) && images.length > 0) {
        const files = await Promise.all(images.map((file) => (0, cloudinary_utils_1.sendFileToCLoudinary)(file, folder)));
        product.images = files;
    }
    //* save product
    await product.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Product created successfully",
        data: product,
        statusCode: 201,
    });
});
//! update product
exports.updateProduct = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    const { name, description, price, stock, category, brand, new_arrival, featured, } = req.body;
    //* get files from req.files
    const { cover_image, images } = req.files;
    //* update product
    if (name)
        product.name = name;
    if (description)
        product.description = description;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    if (brand)
        product.brand = brand;
    if (new_arrival)
        product.new_arrival = new_arrival;
    if (featured)
        product.featured = featured;
    //* delete old cover image from cloudinary and upload new one
    if (cover_image && cover_image[0]) {
        if (product.cover_image?.public_id) {
            await (0, cloudinary_utils_1.deleteFileFromCloudinary)(product.cover_image.public_id);
        }
        const { path, public_id } = await (0, cloudinary_utils_1.sendFileToCLoudinary)(cover_image[0], folder);
        product.cover_image = {
            path,
            public_id,
        };
    }
    //* delete old images from cloudinary and upload new ones
    if (images && Array.isArray(images) && images.length > 0) {
        if (product.images && product.images.length > 0) {
            await Promise.all(product.images.map((image) => (0, cloudinary_utils_1.deleteFileFromCloudinary)(image.public_id)));
        }
        const files = await Promise.all(images.map((file) => (0, cloudinary_utils_1.sendFileToCLoudinary)(file, folder)));
        product.images = files;
    }
    //* save updated product
    await product.save();
    //* success response
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Product updated successfully",
        data: product,
        statusCode: 200,
    });
});
//! remove product
exports.removeProduct = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    await (0, cloudinary_utils_1.deleteFileFromCloudinary)(product.cover_image.public_id);
    if (product.images && product.images.length > 0) {
        const deleteImages = product.images.map((image) => (0, cloudinary_utils_1.deleteFileFromCloudinary)(image.public_id));
        await Promise.all(deleteImages);
    }
    await product_model_1.default.deleteOne({ _id: id });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product with id : ${id} deleted successfully`,
        data: product,
        statusCode: 200,
    });
});
//! get by category
exports.getByCategory = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { categoryId } = req.params;
    const products = await product_model_1.default.find({ category: categoryId });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product by category ${categoryId} fetched`,
        statusCode: 200,
        data: products,
    });
});
//! get by brand
exports.getByBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { brandId } = req.params;
    const products = await product_model_1.default.find({ brand: brandId });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `Product by brand ${brandId} fetched`,
        statusCode: 200,
        data: products,
    });
});
//! get new arrivals
exports.getNewProducts = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ new_arrival: true });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `All new arrivals  fetched`,
        statusCode: 200,
        data: products,
    });
});
//! get all featured products
exports.getFeaturedProducts = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const products = await product_model_1.default.find({ featured: true });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: `All featured Products fetched`,
        statusCode: 200,
        data: products,
    });
});
