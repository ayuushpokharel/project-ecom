import express from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

//! create account
router.post("/register", register);

//! login
router.post("/login", login);

export default router;
