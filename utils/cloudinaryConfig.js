import cloudinary from "cloudinary";
import * as dotenv from "dotenv";

//env config
dotenv.config();

const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
  cloud_name: "saimun",
  api_key: "557893492874456",
  api_secret: "sD-TxY6HS4iurHmJ3rHerT-CZr8",
});

export default cloudinaryConfig;
