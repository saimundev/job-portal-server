import express from "express";
import multer from "multer";
import {
  getUser,
  signInUser,
  signUpUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/get-user/:userId", getUser);
router.post("/signUp-user", signUpUser);
router.post("/signIn-user", signInUser);
router.put("/update-user/:userId", updateUser);

export default router;
