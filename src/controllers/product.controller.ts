import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import { sendFileToCLoudinary } from "../utils/cloudinary.utils";

const folder = "/products";
const folder1 = "/products/images";

//! get all products
export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter = {};
    //* get all products
    const products = await Product.find(filter);

    //* success response
    sendResponse(res, {
      message: "All products fetched",
      data: products,
      statusCode: 200,
    });
  },
);

//! get by id
export const getProductById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //* get id
    const id = req.params;

    //* db query
    const product = await Product.findOne({ _id: id });

    //* not found error
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    //* success response
    sendResponse(res, {
      message: `Product with id : ${id} fetched successfully`,
      data: product,
      statusCode: 200,
    });
  },
);

//! create product
export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //* create product
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
      new_arrival,
      featured,
    } = req.body;

    //* get images from req.file
    const cover_image = req.file as Express.Multer.File;
    const images = req.file as Express.Multer.File;

    //* db query
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      brand,
      new_arrival,
      featured,
    });

    //* required
    if (!name) {
      throw new AppError("name is required", 400);
    }
    if (!description) {
      throw new AppError("description is required", 400);
    }
    if (!price) {
      throw new AppError("price is required", 400);
    }
    if (!stock) {
      throw new AppError("stock number is required", 400);
    }
    if (!category) {
      throw new AppError("category is required", 400);
    }
    if (!brand) {
      throw new AppError("brand is required", 400);
    }
    if (!new_arrival) {
      throw new AppError("new_arrival info. is required", 400);
    }
    if (!featured) {
      throw new AppError("featured info. is required", 400);
    }
    if (!cover_image) {
      throw new AppError("cover_image is required", 400);
    }

    //* handle cover image
    if (cover_image) {
      const { path, public_id } = await sendFileToCLoudinary(
        cover_image,
        folder,
      );
      product.cover_image = { path, public_id };
    }

    //* handle images
    if (images) {
      const { path, public_id } = await sendFileToCLoudinary(images, folder1);
      product.images.push({ type: { path, public_id } });
    }

    //* success response
    sendResponse(res, {
      message: "Product created successfully",
      data: product,
      statusCode: 201,
    });
  },
);
//! update product
//* update product
//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (stock) product.stock = stock;
//     if (category) product.category = category;
//     if (brand) product.brand = brand;
//     if (new_arrival) product.new_arrival = new_arrival;
//     if (featured) product.featured = featured;
//! remove product
//! get by category
//! get by brand
//! get new arrivals
//! get all featured products
