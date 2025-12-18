import adminRoutes from "./admin.routes.js";
import studentRoutes from "./student.routes.js";

const routes = (app) => {
  app.use("/admin", adminRoutes);
  app.use("/student", studentRoutes);
};

export default routes;
