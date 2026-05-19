import express, { NextFunction, request, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

//! importing routes
import routes from "./routes";
import AppError from "./utils/appError.utils";

//! creating express app instance
const app = express();

//! body parser
app.use(express.json({ limit: "10mb" }));

//! using middlewares

//! health route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is up and running",
        success: true,
        status: "success",
    });
});

//! using routes
app.use("/api/v1", routes);

//! path not found error
app.use((req: Request, res: Response) => {
    const message = `cannot ${req.method} on ${req.url}`;
    throw new AppError(message, 404);
});

//! error handler
app.use(errorHandler);

export default app;
