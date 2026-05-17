import express from "express";
import {
    createBrand,
    deleteBrand,
    getBrandById,
    getBrands,
    updateBrand,
} from "../controllers/brand.controller";

const router = express.Router();

//! get all
router.get("/", getBrands);

//! get by id
router.get("/:id", getBrandById);

//! create brand
router.post("/", createBrand);

//! update brand
router.put("/:id", updateBrand);

//! delete brand
router.delete("/:id", deleteBrand);

export default router;
