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
import { Role } from "../types/enum.types";

const router = express();
const upload = multerUpload();

//! get all categories
router.get("/", getCategories);

//! get by id
router.get("/:id", getCategoriesById);

//! create
router.post(
    "/",
    upload.single("category_image"),
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    createCategories,
);

//! update
router.put(
    "/:id",
    upload.single("category_image"),
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    updateCategories,
);

//! remove category
router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), removeCategories);

export default router;
