import { TPayload } from "../types/jwt.type";

declare global {
    namespace Express {
        interface Request {
            user?: TPayload;
            file?: Multer.File;
            files?: Multer.File[];
        }
    }
}
export {};
