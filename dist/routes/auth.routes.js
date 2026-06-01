"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUpload)();
//! create account -> register
router.post("/register", upload.single("profile_image"), auth_controller_1.register);
//! login
router.post("/login", auth_controller_1.login);
//! update profile picture only
router.put("/profile-picture/:id", upload.single("profile_image"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Users), auth_controller_1.updateProfilePicture);
//! update whole profile
router.put("/profile", upload.single("profile_image"), (0, auth_middleware_1.authenticate)(enum_types_1.Only_Users), auth_controller_1.updateProfile);
//! get profile
router.get("/profile", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Users), auth_controller_1.getProfile);
//! change password
router.put("/change-password", (0, auth_middleware_1.authenticate)(enum_types_1.Only_Users), auth_controller_1.changePassword);
//! export
exports.default = router;
