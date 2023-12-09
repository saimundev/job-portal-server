import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://online-job-portal:MIbC4OJ67Bn7PJ71@cluster0.d2pawnh.mongodb.net/online-job-portal?retryWrites=true&w=majority"
    );
    console.log("connect db successful");
  } catch (error) {
    console.log(error);
  }
};

export default db;
