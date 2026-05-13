import express from "express";
import { getAll, getById } from "../controllers/user.controller";

const router = express.Router();

//! get all
router.get("/", getAll);

//! get by id
router.get("/:id", getById);

//! delete user

export default router;
