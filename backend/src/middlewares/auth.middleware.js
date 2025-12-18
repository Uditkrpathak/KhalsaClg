import { verifyToken } from '../utils/jwtUtils.js';
import Admin from '../models/admin.model.js';
import Student from '../models/student.model.js';

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Middleware to check if user is admin
 */
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin only.' 
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied' 
    });
  }
};

/**
 * Middleware to check if user is student
 */
export const isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Student only.' 
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied' 
    });
  }
};
