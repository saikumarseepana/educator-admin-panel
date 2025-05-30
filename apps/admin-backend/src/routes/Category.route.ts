import express from'express'
import { createCategory, getAllCategories, updateCategory, deleteCategory } from '../controllers/Category.controller'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

// CREATE
router.post("/create", verifyToken, createCategory);

//READ
router.get("/all", verifyToken, getAllCategories);

// UPDATE
router.put("/update/:id", verifyToken, updateCategory);

// DELETE
router.delete("/delete/:id", verifyToken, deleteCategory);

export default router;