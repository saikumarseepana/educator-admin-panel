import express from 'express'
import { adminLoginController as login } from '../controllers/AdminUser.controller';

const router = express.Router();


router.post('/login', login);

export default router;