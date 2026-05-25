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
import { Only_Admins, Role } from "../types/enum.types";

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
    authenticate(Only_Admins),
    updateProfilePicture,
);

//! update whole profile
router.put(
    "/profile/:id",
    upload.single("profile_image"),
    authenticate(Only_Admins),
    updateProfile,
);

//! get profile
router.get("/profile/:id", authenticate(Only_Admins), getProfile);

//! change password
router.put(
    "/change-password/:id",
    authenticate([Role.USER, Role.ADMIN, Role.SUPER_ADMIN]),
    changePassword,
);

//! export
export default router;
