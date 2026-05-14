import express from "express";
import {
    createCategories,
    deleteCategories,
    getCategories,
    getCategoriesById,
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
router.delete("/:id", deleteCategories);

export default router;
