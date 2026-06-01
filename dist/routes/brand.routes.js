"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controllers/brand.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUpload)();
//! get all
router.get("/", brand_controller_1.getBrands);
//! get by id
router.get("/:id", brand_controller_1.getBrandById);
//! create brand
router.post("/", upload.single("brand_logo"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), brand_controller_1.createBrand);
//! update brand
router.put("/:id", upload.single("brand_logo"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), brand_controller_1.updateBrand);
//! remove brand
router.delete("/:id", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), brand_controller_1.deleteBrand);
exports.default = router;
