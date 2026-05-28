import express from "express";
import { multerUpload } from "../middlewares/multer.middleware";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Admins } from "../types/enum.types";

const router = express.Router();
const upload = multerUpload();

//! get all
router.get("/", getProducts);

//! get by id
router.get("/:id", getProductById);

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
// router.put()

//! remove product
// router.delete()

//! get by category
router.get("/category/:categoryId", getProducts);

//! get by brand
router.get("/brand/:brandId", getProducts);

//! get new arrivals
router.get("/new-arrivals", getProducts);

//! get all featured products
router.get("/featured", getProducts);

export default router;
