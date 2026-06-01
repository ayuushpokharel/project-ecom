import express from "express";
import { multerUpload } from "../middlewares/multer.middleware";
import {
  createProduct,
  getByBrand,
  getByCategory,
  getFeaturedProducts,
  getNewProducts,
  getProductById,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Admins } from "../types/enum.types";

const router = express.Router();
const upload = multerUpload();

//! get all
router.get("/", getProducts);

//! create
router.post(
  "/",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  authenticate(Only_Admins),
  createProduct,
);

//! update product
router.put(
  "/:id",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  authenticate(Only_Admins),
  updateProduct,
);

//! remove product
router.delete("/:id", authenticate(Only_Admins), removeProduct);

//! get by category
router.get("/category/:categoryId", getByCategory);

//! get by brand
router.get("/brand/:brandId", getByBrand);

//! get new arrivals
router.get("/new-arrivals", getNewProducts);

//! get all featured products
router.get("/featured", getFeaturedProducts);

//! get by id
router.get("/:id", getProductById);

export default router;
