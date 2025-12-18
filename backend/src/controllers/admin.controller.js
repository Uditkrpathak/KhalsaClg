import Admin from "../models/admin.model.js";

export const createAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
};
