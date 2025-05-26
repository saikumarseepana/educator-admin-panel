import express from'express'
import { createCategory, getAllCategories } from '../controllers/Category.controller'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

router.post("/create", verifyToken, createCategory);

router.get("/all", verifyToken, getAllCategories);

export default router;