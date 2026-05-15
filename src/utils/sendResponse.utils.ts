import { Response } from "express";

type TResponse<T> = {
    message: string;
    data?: T;
    statusCode: number;
};
export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        message: data.message,
        data: data.data,
        status: "success",
        success: true,
    });
};
