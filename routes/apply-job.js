import express from "express";
import {
  applyJob,
  cancelApply,
  getApplyJobById,
  getApplyJobs,
} from "../controllers/apply-job.js";

const router = express.Router();

router.post("/apply-job", applyJob);
router.get("/get-apply-job/:userId", getApplyJobs);
router.get("/get-apply-jobById/:jobId", getApplyJobById);
router.delete("/cancel-job-apply/:jobId", cancelApply);

export default router;
