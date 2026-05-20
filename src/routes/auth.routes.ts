import express from "express";
import { register, login } from "../controllers/auth.controller";
import { multerUpload } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = multerUpload();

//! create account -> register

router.post("/register", upload.single("profile_image"), register);

//! login
router.post("/login", login);

//! export
export default router;
