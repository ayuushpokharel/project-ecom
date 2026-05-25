import express from "express";
import {
    createBrand,
    deleteBrand,
    getBrandById,
    getBrands,
    updateBrand,
} from "../controllers/brand.controller";
import { multerUpload } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Admins, Role } from "../types/enum.types";

const router = express.Router();
const upload = multerUpload();

//! get all
router.get("/", getBrands);

//! get by id
router.get("/:id", getBrandById);

//! create brand
router.post(
    "/",
    upload.single("brand_logo"),
    authenticate(Only_Admins),
    createBrand,
);

//! update brand
router.put(
    "/:id",
    upload.single("brand_logo"),
    authenticate(Only_Admins),
    updateBrand,
);

//! remove brand
router.delete("/:id", authenticate(Only_Admins), deleteBrand);

export default router;
