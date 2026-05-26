import { TPayLoad } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user: TPayLoad;
      file?: Multer.File;
      files?: Multer.File[];
    }
  }
}
export {};
