"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_middleware_1 = require("../middlewares/multer.middleware");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUpload)();
//! get all
router.get("/", product_controller_1.getProducts);
//! create
router.post("/", upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
]), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), product_controller_1.createProduct);
//! update product
router.put("/:id", upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "images", maxCount: 10 },
]), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), product_controller_1.updateProduct);
//! remove product
router.delete("/:id", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), product_controller_1.removeProduct);
//! get by category
router.get("/category/:categoryId", product_controller_1.getByCategory);
//! get by brand
router.get("/brand/:brandId", product_controller_1.getByBrand);
//! get new arrivals
router.get("/new-arrivals", product_controller_1.getNewProducts);
//! get all featured products
router.get("/featured", product_controller_1.getFeaturedProducts);
//! get by id
router.get("/:id", product_controller_1.getProductById);
exports.default = router;
