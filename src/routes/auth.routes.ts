import express from "express";
import { register, login, getProfile, changePassword, updateProfile, updateProfilePicture } from "../controllers/auth.controller";
import { multerUpload } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = multerUpload();

//! create account -> register

router.post("/register", upload.single("profile_image"), register);

//! login
router.post("/login", login);

//! update profile picture only
router.put("/profile-picture/:id", upload.single("profile_image"), updateProfilePicture);

//! update whole profile
router.put("/profile/:id", upload.single("profile_image"), updateProfile);

//! get profile
router.get("/profile/:id", getProfile);
 
//! change password
router.put("/change-password/:id", changePassword);

//! export
export default router;
