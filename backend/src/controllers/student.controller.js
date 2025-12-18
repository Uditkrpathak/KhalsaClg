import Student from '../models/student.model.js';
import { comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

/**
 * Student login
 * POST /api/student/login
 */
export const loginStudent = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    // Find student
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if student is active
    if (student.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account is inactive. Please contact admin.' 
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken({
      id: student._id,
      rollNumber: student.rollNumber,
      role: 'student'
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: student._id,
          name: student.name,
          rollNumber: student.rollNumber,
          course: student.course,
          year: student.year,
          email: student.email,
          phoneNumber: student.phoneNumber,
          role: 'student'
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Get student profile (protected route)
 * GET /api/student/profile
 */
export const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password');

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Update student profile (protected route)
 * PUT /api/student/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { email, phoneNumber },
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: student
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

