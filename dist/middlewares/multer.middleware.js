"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const file_size = 10 * 1024 * 1024;
//!
const multerUpload = () => {
    //* upload folder
    const uploadFolder = path_1.default.join(process.cwd(), "uploads");
    //* create folder if it does not exist
    if (!fs_1.default.existsSync(uploadFolder)) {
        fs_1.default.mkdirSync(uploadFolder, { recursive: true });
    }
    //* multer storage
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolder);
        },
        filename: function (req, file, cb) {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        },
    });
    //* file filter
    const fileFilter = (req, file, cb) => {
        const allowedExtensions = /jpeg|jpg|png|webp|pdf|gif|avif/;
        const allowedMimeTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "application/pdf",
            "image/gif",
            "image/avif",
        ];
        const extName = allowedExtensions.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
        const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);
        if (extName && isAllowedMimeType) {
            cb(null, true);
        }
        else {
            cb(new appError_utils_1.default("Only images (jpeg, jpg, png, webp, gif, avif) and pdf files are allowed", 400));
        }
    };
    //* upload the folder
    const upload = (0, multer_1.default)({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: file_size,
        },
    });
    return upload;
};
exports.multerUpload = multerUpload;
