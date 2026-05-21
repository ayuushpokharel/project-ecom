import multer from "multer";
import path from "path";
import fs from "fs";
import AppError from "../utils/appError.utils";

const file_size = 10 * 1024 * 1024;

//!
export const multerUpload = () => {
    //* upload folder
    const uploadFolder = path.join(process.cwd(), "uploads");

    //* create folder if it does not exist
    if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder, { recursive: true });
    }

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

    //* file filter
    const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
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
        const extName = allowedExtensions.test(
            path.extname(file.originalname).toLocaleLowerCase(),
        );
        const isAllowedMimeType = allowedMimeTypes.includes(file.mimetype);
        if (extName && isAllowedMimeType) {
            cb(null, true);
        } else {
            cb(
                new AppError(
                    "Only images (jpeg, jpg, png, webp, gif, avif) and pdf files are allowed",
                    400,
                ),
            );
        }
    };

    //* upload the folder
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: file_size,
        },
    });

    return upload;
};
