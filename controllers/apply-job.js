import joi from "joi";
import ApplyModel from "../models/apply-job.js";

export const applyJob = async (req, res) => {
  const { name, email, phone, resume, userId, jobId } = req.body;

  const schema = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().min(5).max(30).email(),
    phone: joi.number(),
    salary: joi.number(),
    resume: joi.string(),
    userId: joi.string(),
    jobId: joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });

  try {
    await ApplyModel.create(req.body);
    res.status(201).json({ message: "Apply successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
  }
};

export const getApplyJobs = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  try {
    const applyJobs = await ApplyModel.find({ userId }).populate(
      "jobId",
      "_id jobTitle createdAt"
    );
    res.status(200).json(applyJobs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelApply = async (req, res) => {
  const { jobId } = req.params;
  try {
    const applyJobs = await ApplyModel.findByIdAndDelete(
      { _id: jobId },
      { new: true }
    );
    res.status(200).json({ message: "Apply cancel successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getApplyJobById = async (req, res) => {
  const { jobId } = req.params;
  console.log("job", jobId);
  try {
    const applyJobs = await ApplyModel.find({ jobId: jobId });
    res.status(200).json(applyJobs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
