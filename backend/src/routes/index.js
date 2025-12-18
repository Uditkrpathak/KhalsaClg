import express from 'express';
import adminRoutes from "./admin.routes.js";
import studentRoutes from "./student.routes.js";

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);

export default router;
