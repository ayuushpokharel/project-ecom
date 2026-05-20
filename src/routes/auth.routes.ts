import express from "express";
import { register, login } from "../controllers/auth.controller";
import multer from "multer";
import path from "path";
import fs from "fs";
const router = express.Router();

//! create account -> register

//* upload folder
const uploadFolder = path.join(process.cwd(), "uploads");

//* multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

//* upload the folder
const upload = multer({ storage: storage });

//* create folder if it does not exist
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

//* create account
router.post("/register", upload.single("profile_image"), register);

//! login
router.post("/login", login);

//! export 
export default router;
