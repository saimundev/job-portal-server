import mongoose from "mongoose";

const postJobSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    createdPost: {
      type: mongoose.Types.ObjectId,
      ref: "employer",
    },
    organizationType: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    vacancy: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    employmentType: {
      type: String,
      required: true,
    },
    jobContext: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    jobResponsibilities: {
      type: String,
      required: true,
    },
    jobBenefit: {
      type: String,
      required: true,
    },
    applyEmail: {
      type: String,
      required: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PostJobModel = mongoose.model("post-job", postJobSchema);

export default PostJobModel;
