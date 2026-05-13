import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";

//! importing routes
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

//! error handler
app.use(errorHandler);

export default app;
