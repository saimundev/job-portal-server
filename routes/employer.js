import express from "express";
import {
  imageUpload,
  signInEmployment,
  signUpEmployment,
} from "../controllers/employer.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

router.post("/signUp-employment", signUpEmployment);
router.post("/signIn-employment", signInEmployment);
router.post("/upload-image", upload.single("logo_image"), imageUpload);

export default router;
