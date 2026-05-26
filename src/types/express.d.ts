import mongoose from "mongoose";
import TPayLoad from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: mongoose.Types.ObjectId;
        full_name?: string;
        role: Role;
        email: string;
      };
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}
export {};
