import express from "express";
import {
    createCategories,
    getCategories,
    getCategoriesById,
    removeCategories,
    updateCategories,
} from "../controllers/category.controller";
import { multerUpload } from "../middlewares/multer.middleware";

const router = express();
const upload = multerUpload();

//! get all categories
router.get("/", getCategories);

//! get by id
router.get("/:id", getCategoriesById);

//! create
router.post("/", upload.single("category_image"), createCategories);

//! update
router.put("/:id", upload.single("category_image"), updateCategories);

//! remove category
router.delete("/:id", removeCategories);

export default router;
