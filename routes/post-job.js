import express from "express";
import {
  createJob,
  deleteJob,
  getAllJob,
  getCategory,
  getJob,
  getJobByUserId,
  getTotalJob,
  suggestion,
  updateJob,
} from "../controllers/post-job.js";

const router = express.Router();

router.post("/create-job", createJob);
router.get("/get-jobs", getAllJob);
router.get("/suggestion-jobs", suggestion);
router.get("/get-job/:jobId", getJob);
router.get("/get-jobByUser/:userId", getJobByUserId);
router.get("/get-total-job", getTotalJob);
router.get("/get-category/:category", getCategory);
router.put("/update-job/:jobId", updateJob);
router.delete("/delete-job/:jobId", deleteJob);

export default router;
