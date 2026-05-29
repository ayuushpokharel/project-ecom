import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/appError.utils";
import {
  deleteFileFromCloudinary,
  sendFileToCLoudinary,
} from "../utils/cloudinary.utils";
import Category from "../models/category.model";
import Brand from "../models/brand.model";

const folder = "/products";

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

    //* get files from req.files
    const { cover_image, images } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    //* validate required fields
    if (!name) throw new AppError("name is required", 400);
    if (!description) throw new AppError("description is required", 400);
    if (!price) throw new AppError("price is required", 400);
    if (!stock) throw new AppError("stock is required", 400);
    // if (!category) throw new AppError("category is required", 400);
    // if (!brand) throw new AppError("brand is required", 400);

    //* validate cover image
    if (!cover_image[0]) {
      throw new AppError("cover image is required", 400);
    }

    //* create product
    const product = new Product({
      name,
      description,
      price,
      stock,
      new_arrival,
      featured,
    });

    const p_category = await Category.findOne({ _id: category });
    const p_brand = await Brand.findOne({ _id: brand });

    if (!p_category) throw new AppError("Invalid category", 400);
    if (!p_brand) throw new AppError("Invalid brand", 400);

    //* upload cover image to cloudinary
    const { path, public_id } = await sendFileToCLoudinary(
      cover_image[0],
      folder,
    );
    product.cover_image = {
      path,
      public_id,
    };

    //* upload multiple images to cloudinary
    if (images && Array.isArray(images) && images.length > 0) {
      const files = await Promise.all(
        images.map((file) => sendFileToCLoudinary(file, folder)),
      );
      product.images = files as any;
    }

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
export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new AppError("Product not found", 404);
    }
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

    //* get files from req.files
    const { cover_image, images } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    //* update product
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (new_arrival) product.new_arrival = new_arrival;
    if (featured) product.featured = featured;

    //* delete old cover image from cloudinary and upload new one
    if (cover_image && cover_image[0]) {
      if (product.cover_image?.public_id) {
        await deleteFileFromCloudinary(product.cover_image.public_id);
      }
      const { path, public_id } = await sendFileToCLoudinary(
        cover_image[0],
        folder,
      );
      product.cover_image = {
        path,
        public_id,
      };
    }

    //* delete old images from cloudinary and upload new ones
    if (images && Array.isArray(images) && images.length > 0) {
      if (product.images && product.images.length > 0) {
        await Promise.all(
          product.images.map((image: any) =>
            deleteFileFromCloudinary(image.public_id),
          ),
        );
      }
      const files = await Promise.all(
        images.map((file) => sendFileToCLoudinary(file, folder)),
      );
      product.images = files as any;
    }

    //* save updated product
    await product.save();

    //* success response
    sendResponse(res, {
      message: "Product updated successfully",
      data: product,
      statusCode: 200,
    });
  },
);

//! remove product
export const removeProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    await deleteFileFromCloudinary(product.cover_image.public_id);
    if (product.images && product.images.length > 0) {
      const deleteImages = product.images.map((image: any) =>
        deleteFileFromCloudinary(image.public_id),
      );
      await Promise.all(deleteImages);
    }
    await Product.deleteOne({ _id: id });

    sendResponse(res, {
      message: `Product with id : ${id} deleted successfully`,
      data: product,
      statusCode: 200,
    });
  },
);

//! get by category
export const getByCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const products = await Product.find({ category: categoryId });

  sendResponse(res, {
    message: `Product by category ${categoryId} fetched`,
    statusCode: 200,
    data: products,
  });
});

//! get by brand
export const getByBrand = catchAsync(async (req: Request, res: Response) => {
  const { brandId } = req.params;
  const products = await Product.find({ brand: brandId });

  sendResponse(res, {
    message: `Product by brand ${brandId} fetched`,
    statusCode: 200,
    data: products,
  });
});

//! get new arrivals
export const getNewProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find({ new_arrival: true });

    sendResponse(res, {
      message: `All new arrivals  fetched`,
      statusCode: 200,
      data: products,
    });
  },
);

//! get all featured products
export const getFeaturedProducts = catchAsync(
  async (req: Request, res: Response) => {
    const products = await Product.find({ featured: true });

    sendResponse(res, {
      message: `All featured Products fetched`,
      statusCode: 200,
      data: products,
    });
  },
);
