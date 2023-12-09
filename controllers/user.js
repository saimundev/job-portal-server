import bcrypt from "bcrypt";
import joi from "joi";
import UserModel from "../models/user.js";
import genAuthToken from "../utils/genAuthToken.js";

//sign up employment
export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  const schema = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().min(5).max(100).email(),
    password: joi.string().min(5).max(100),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    const isEmailExist = await UserModel.findOne({ email: email });
    if (isEmailExist)
      return res.status(400).json({ message: "User already exist" });

    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = genAuthToken(createUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//sign up employment
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const schema = joi.object({
    email: joi.string().min(5).max(100).email(),
    password: joi.string().min(5).max(100),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    const isEmailExist = await UserModel.findOne({ email: email });
    if (!isEmailExist)
      return res.status(400).json({ message: "User not found" });

    const isMatchPassword = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isMatchPassword)
      return res.status(400).json({ message: "Password not match" });

    const token = genAuthToken(isEmailExist);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById({ _id: userId });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
