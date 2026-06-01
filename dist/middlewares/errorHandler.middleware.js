"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const errorHandler = (error, req, res, next) => {
    let message = error?.message || "Internal server error";
    let statusCode = error?.statusCode || 500;
    let status = error?.status || "error";
    //! custom error
    if (error instanceof appError_utils_1.default) {
        message = error.message;
    }
    //! validation error
    if (error.name == "ValidationError") {
        message = Object.values(error.errors)
            .map((err) => err.message)
            .join(",");
        statusCode = 422;
        status = "fail";
    }
    //! mongoose error
    if (error.name == "MongooseError") {
        message = error.message;
        statusCode = 400;
        status = "fail";
    }
    console.log(error.name);
    //! jwt response
    //* error response
    res.status(statusCode).json({
        message,
        status,
        success: false,
        data: null,
    });
};
exports.errorHandler = errorHandler;
