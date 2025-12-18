import express from 'express';
import { 
  createFirstAdmin, 
  loginAdmin, 
  addAdmin, 
  addStudent, 
  getAllStudents, 
  getStudentById, 
  updateStudent, 
  deleteStudent,
  getAllAdmins
} from '../controllers/admin.controller.js';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/create', createFirstAdmin);
router.post('/login', loginAdmin);

// Protected routes (admin only)
router.post('/add-admin', authenticate, isAdmin, addAdmin);
router.post('/add-student', authenticate, isAdmin, addStudent);
router.get('/students', authenticate, isAdmin, getAllStudents);
router.get('/students/:id', authenticate, isAdmin, getStudentById);
router.put('/students/:id', authenticate, isAdmin, updateStudent);
router.delete('/students/:id', authenticate, isAdmin, deleteStudent);
router.get('/admins', authenticate, isAdmin, getAllAdmins);

export default router;
