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
  upload.single("cover_image"),
  upload.array("images", 10),
  authenticate(Only_Admins),
  createProduct,
);

//! update product
// router.put()

//! remove product
// router.delete()

//! get by category
// router.get()

//! get by brand
// router.get()

//! get new arrivals
// router.get()

//! get all featured products
// router.get()

export default router;
