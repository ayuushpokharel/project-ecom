import express from "express";
import {
    createCategories,
    getCategories,
    getCategoriesById,
    removeCategories,
    updateCategories,
} from "../controllers/category.controller";
import { multerUpload } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Admins } from "../types/enum.types";

const router = express.Router();
const upload = multerUpload();

//! get all categories
router.get("/", getCategories);

//! get by id
router.get("/:id", getCategoriesById);

//! create
router.post(
    "/",
    upload.single("category_image"),
    authenticate(Only_Admins),
    createCategories,
);

//! update
router.put(
    "/:id",
    upload.single("category_image"),
    authenticate(Only_Admins),
    updateCategories,
);

//! remove category
router.delete("/:id", authenticate(Only_Admins), removeCategories);

export default router;
