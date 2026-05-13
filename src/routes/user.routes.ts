import express from "express";
import { deleteUser, getAll, getById } from "../controllers/user.controller";

const router = express.Router();

//! get all
router.get("/", getAll);

//! get by id
router.get("/:id", getById);

//! delete user
router.get("/:id", deleteUser);

export default router;
