"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// appError
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode > 400 && statusCode < 500 ? "fail" : "error";
        this.success = false;
        Error.captureStackTrace(this, AppError);
    }
}
exports.default = AppError;
