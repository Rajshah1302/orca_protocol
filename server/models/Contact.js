const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    role: { type: String },
    email: { type: String, required: true },
    companyType: { type: String, required: true },
    userBase: { type: String, required: true },
    employeeCount: { type: String, required: true },
    arrRange: { type: String, required: true },
    dataStack: { type: [String], required: true },
    dataProblem: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
