// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rollNumber: { type: String, unique: true },
//   course: { type: String, required: true },
//   year: { type: Number, required: true },
//   email: { type: String, required: true },
//   password: { type: String },
//   status: { type: String, enum: ["active", "inactive"], default: "active" }
// }, { timestamps: true });

// export default mongoose.model("Student", studentSchema);


import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
