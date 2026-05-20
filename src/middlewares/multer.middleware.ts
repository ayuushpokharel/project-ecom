import multer from "multer";
import path from "path";
import fs from "fs";

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

    //* upload the folder
    const upload = multer({ storage: storage });
    return upload;
};
