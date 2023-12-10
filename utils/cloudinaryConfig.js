import cloudinary from "cloudinary";
import * as dotenv from "dotenv";

//env config
dotenv.config();

const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
  cloud_name: "saimun",
  api_key: "sD-TxY6HS4iurHmJ3rHerT-CZr8",
  api_secret: "557893492874456",
});

export default cloudinaryConfig;
