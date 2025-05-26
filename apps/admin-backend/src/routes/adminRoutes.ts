import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware'

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

export default router;