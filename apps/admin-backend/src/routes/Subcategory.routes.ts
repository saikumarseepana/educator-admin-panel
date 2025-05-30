import express from 'express'
import { createSubcategory, deleteSubcategory, getAllSubcategories, updateSubcategory } from '../controllers/Subcategory.controller'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

//POST
router.post('/create', verifyToken, createSubcategory);

//GET
router.get('/category/:categoryId', verifyToken, getAllSubcategories);

//PUT
router.put('/update/:id', verifyToken, updateSubcategory);

//DELETE
router.delete('/delete/:id', verifyToken, deleteSubcategory);

export default router;