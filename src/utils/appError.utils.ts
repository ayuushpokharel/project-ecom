// appError
class AppError extends Error {
    statusCode: number;
    status: "error" | "success" | "fail";
    success: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode > 400 && statusCode < 500 ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, AppError);
    }
}
export default AppError;
