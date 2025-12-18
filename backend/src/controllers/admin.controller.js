import Admin from '../models/admin.model.js';
import Student from '../models/student.model.js';
import { hashPassword, comparePassword, generatePasswordFromDOB } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

/**
 * Create first admin (public route for Thunder Client)
 * POST /api/admin/create
 */
export const createFirstAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
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
 * Admin login
 * POST /api/admin/login
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken({
      id: admin._id,
      email: admin.email,
      role: admin.role
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
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
 * Add new admin (protected route)
 * POST /api/admin/add-admin
 */
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Admin added successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
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
 * Add new student (protected route)
 * POST /api/admin/add-student
 */
export const addStudent = async (req, res) => {
  try {
    const { name, rollNumber, course, year, email, phoneNumber, dateOfBirth } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student with this roll number already exists' 
      });
    }

    // Generate password from DOB
    const generatedPassword = generatePasswordFromDOB(dateOfBirth);
    const hashedPassword = await hashPassword(generatedPassword);

    // Create student
    const student = await Student.create({
      name,
      rollNumber,
      course,
      year,
      email,
      phoneNumber,
      dateOfBirth,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        course: student.course,
        year: student.year,
        email: student.email,
        phoneNumber: student.phoneNumber,
        dateOfBirth: student.dateOfBirth,
        generatedPassword: generatedPassword // Send to admin to share with student
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
 * Get all students (protected route)
 * GET /api/admin/students
 */
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Get student by ID (protected route)
 * GET /api/admin/students/:id
 */
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');

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
 * Update student (protected route)
 * PUT /api/admin/students/:id
 */
export const updateStudent = async (req, res) => {
  try {
    const { name, course, year, email, phoneNumber, status } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, course, year, email, phoneNumber, status },
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
      message: 'Student updated successfully',
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
 * Delete student (protected route)
 * DELETE /api/admin/students/:id
 */
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Get all admins (protected route)
 * GET /api/admin/admins
 */
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

