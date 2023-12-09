import cloudinary from "cloudinary";
import * as dotenv from "dotenv";

//env config
dotenv.config();

const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
  cloud_name: process.env.API_Name,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinaryConfig;
