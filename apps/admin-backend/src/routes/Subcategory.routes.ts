import express from 'express'
import { createSubcategory, getAllSubcategories } from '../controllers/Subcategory.controller'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

//create subcategory
router.post('/create', verifyToken, createSubcategory);

//get subcategories under a specific category
router.get('/category/:categoryId', verifyToken, getAllSubcategories);

export default router;