import express from "express";
import {
    createBrand,
    deleteBrand,
    getBrandById,
    getBrands,
    updateBrand,
} from "../controllers/brand.controller";
import { multerUpload } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = multerUpload();

//! get all
router.get("/", getBrands);

//! get by id
router.get("/:id", getBrandById);

//! create brand
router.post("/", upload.single("logo"), createBrand);

//! update brand
router.put("/:id", upload.single("logo"), updateBrand);

//! delete brand
router.delete("/:id", deleteBrand);

export default router;
