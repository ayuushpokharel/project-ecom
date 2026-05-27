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
    //* get body
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

    //* validate required fields
    if (!name) throw new AppError("name is required", 400);
    if (!description) throw new AppError("description is required", 400);
    if (!price) throw new AppError("price is required", 400);
    if (!stock) throw new AppError("stock is required", 400);
    if (!category) throw new AppError("category is required", 400);
    if (!brand) throw new AppError("brand is required", 400);

    //* get files from req.files
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const cover_image_file = files?.["cover_image"]?.[0];
    const image_files = files?.["images"] ?? [];

    //* validate cover image
    if (!cover_image_file) {
      throw new AppError("cover image is required", 400);
    }

    //* upload cover image to cloudinary
    const cover_image = await sendFileToCLoudinary(cover_image_file, folder);

    //* upload multiple images to cloudinary
    const images = await Promise.all(
      image_files.map((file) => sendFileToCLoudinary(file, folder1)),
    );

    //* create product
    const product = new Product({
      name,
      description,
      price,
      stock,
      category,
      brand,
      new_arrival,
      featured,
      cover_image,
      images,
    });

    //* save product
    await product.save();

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
