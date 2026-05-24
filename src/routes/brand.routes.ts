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
import { Role } from "../types/enum.types";

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
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    createBrand,
);

//! update brand
router.put(
    "/:id",
    upload.single("brand_logo"),
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    updateBrand,
);

//! delete brand
router.delete(
    "/:id",
    authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    deleteBrand,
);

export default router;
