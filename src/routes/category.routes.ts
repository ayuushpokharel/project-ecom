import express from "express";
import {
    createCategories,
    getCategories,
    getCategoriesById,
    removeCategories,
    updateCategories,
} from "../controllers/category.controller";

const router = express();

//! get all categories
router.get("/", getCategories);

//! get by id
router.get("/:id", getCategoriesById);

//! create
router.post("/", createCategories);

//! update
router.put("/:id", updateCategories);

//! delete
router.delete("/:id", removeCategories);

export default router;
