import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

//! creating express app instance
const app = express();

//! body parser
app.use(express.json({ limit: "10mb" }));

//! using middleware

//! helth routes
app.use("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server id up and running",
        success: true,
        status: "success",
    });
});

//! using routes
// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

//! using handler
app.use;
export default app;
