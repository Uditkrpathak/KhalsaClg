import express from 'express';
import { loginStudent, getProfile, updateProfile } from '../controllers/student.controller.js';
import { authenticate, isStudent } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginStudent);

// Protected routes (student only)
router.get('/profile', authenticate, isStudent, getProfile);
router.put('/profile', authenticate, isStudent, updateProfile);

export default router;
