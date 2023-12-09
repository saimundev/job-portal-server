import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
      required: true,
    },
    companyLocation: {
      type: String,
      required: true,
    },
    companyAddress: {
      type: String,
      required: true,
    },
    companyDescription: {
      type: String,
      required: true,
    },
    tradeLicense: {
      type: String,
      required: true,
    },
    websiteURL: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    image_id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

const EmployerModel = mongoose.model("employer", employerSchema);

export default EmployerModel;
