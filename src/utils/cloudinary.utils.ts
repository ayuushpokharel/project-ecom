import cloudinary from "../config/cloudinary.config";
import fs from "fs";
export const sendFileToCLoudinary = async (
    file: Express.Multer.File,
    folder = "/",
) => {
    try {
        const upload_folder = "project-ecom" + folder;
        const { public_id, secure_url } = await cloudinary.uploader.upload(
            file.path,
            {
                folder: upload_folder,
                transformation: [
                    {
                        width: 800,
                        crop: "scale",
                        fetch_format: "auto",
                        quality: "auto",
                    },
                ],
            },
        );
        //* delete image from server uploads folder
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        return {
            public_id,
            path: secure_url,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//? delete file from cloudinary
export const deleteFileFromCloudinary = async (public_id: string) => {
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
