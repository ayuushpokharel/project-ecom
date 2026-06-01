"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUpload)();
//! get all categories
router.get("/", category_controller_1.getCategories);
//! get by id
router.get("/:id", category_controller_1.getCategoriesById);
//! create
router.post("/", upload.single("category_image"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), category_controller_1.createCategories);
//! update
router.put("/:id", upload.single("category_image"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), category_controller_1.updateCategories);
//! remove category
router.delete("/:id", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Admins), category_controller_1.removeCategories);
exports.default = router;
