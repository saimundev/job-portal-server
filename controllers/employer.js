import EmployerModel from "../models/employer.js";
import cloudinaryConfig from "../utils/cloudinaryConfig.js";
import bcrypt from "bcrypt";
import genAuthToken from "../utils/genAuthToken.js";
import joi from "joi";

//sign up employment
export const signUpEmployment = async (req, res) => {
  console.log(req.body);
  const schema = joi.object({
    name: joi.string().min(5).max(100),
    email: joi.string().min(5).max(100).email(),
    password: joi.string().min(5).max(100),
    companyName: joi.string().min(5).max(100),
    companyLocation: joi.string().min(5).max(100),
    companyAddress: joi.string(),
    companySize: joi.string(),
    companyDescription: joi.string(),
    tradeLicense: joi.string(),
    websiteURL: joi.string().uri(),
    image_url: joi.string(),
    image_id: joi.string(),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    const isEmailExist = await EmployerModel.findOne({ email: req.body.email });
    if (isEmailExist)
      return res.status(400).json({ message: "Email already exist" });

    const bcryptPassword = await bcrypt.hash(req.body.password, 10);
    const user = await EmployerModel.create({
      ...req.body,
      password: bcryptPassword,
    });

    const token = genAuthToken(user);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//company logo image upload
export const imageUpload = async (req, res) => {
  console.log(req.file);
  try {
    if (req.file) {
      const uploadResponse = await cloudinaryConfig.uploader.upload(
        req.file.path,
        { upload_preset: "job_portal" }
      );
      console.log("res", uploadResponse);

      if (uploadResponse) {
        res.status(201).json({
          image_url: uploadResponse.secure_url,
          image_id: uploadResponse.public_id,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

//sign in employment
export const signInEmployment = async (req, res) => {
  const { email, password } = req.body;
  const schema = joi.object({
    email: joi.string().min(5).max(100).email(),
    password: joi.string().min(5).max(100),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    const isEmailExist = await EmployerModel.findOne({ email: email });
    if (!isEmailExist)
      return res.status(400).json({ message: "User not found" });

    const isMatchPassword = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    console.log(isEmailExist.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Password not match" });

    const token = genAuthToken(isEmailExist);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
