import cloudinary from "../config/cloudinary.config";
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
        return {
            public_id,
            path: secure_url,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
