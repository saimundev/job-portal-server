import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: "post-job",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const ApplyModel = mongoose.model("Apply", applySchema);

export default ApplyModel;
