import express from 'express';
import { createTopic, getTopicsBySubcategory } from '../controllers/Topic.controller'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

//create a topic under a subcategory
router.post('/create', verifyToken, createTopic);

//Get all topics for a given subcategory
router.get('/subcategory/:subcategoryId', verifyToken, getTopicsBySubcategory);

export default router;