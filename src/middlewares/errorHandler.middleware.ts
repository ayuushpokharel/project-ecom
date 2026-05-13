import { NextFunction, Request, Response } from "express";

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const message = error?.message || "Internal server error";
    const statusCode = error?.statusCode || 500;
    const status = error?.status || "error";

    //* error response
    res.status(statusCode).json({
        message,
        status,
        success: false,
        data: null,
    });
};
