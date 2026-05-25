import express from "express";
import {
    register,
    login,
    getProfile,
    changePassword,
    updateProfile,
    updateProfilePicture,
} from "../controllers/auth.controller";
import { multerUpload } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { Only_Users } from "../types/enum.types";

const router = express.Router();
const upload = multerUpload();

//! create account -> register

router.post("/register", upload.single("profile_image"), register);

//! login
router.post("/login", login);

//! update profile picture only
router.put(
    "/profile-picture/:id",
    upload.single("profile_image"),
    authenticate(Only_Users),
    updateProfilePicture,
);

//! update whole profile
router.put(
    "/profile",
    upload.single("profile_image"),
    authenticate(Only_Users),
    updateProfile,
);

//! get profile
router.get("/profile", authenticate(Only_Users), getProfile);

//! change password
router.put("/change-password", authenticate(Only_Users), changePassword);

//! export
export default router;
