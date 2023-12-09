import joi from "joi";
import PostJobModel from "../models/post-job.js";
import EmployerModel from "../models/employer.js";

//create a job
export const createJob = async (req, res) => {
  const {
    companyName,
    jobTitle,
    vacancy,
    location,
    education,
    organizationType,
    workPlace,
    salary,
    category,
    jobContext,
    JobResponsibilities,
    Benefits,
    applyEmail,
    deadline,
    userId,
  } = req.body;
  const schema = joi.object({
    companyName: joi.string().min(5).max(100),
    jobTitle: joi.string().min(5).max(100),
    education: joi.string().min(5).max(100),
    userId: joi.string(),
    category: joi.string(),
    location: joi.string().min(5).max(100),
    organizationType: joi.string(),
    salary: joi.number(),
    experienceLevel: joi.string(),
    vacancy: joi.number(),
    employmentType: joi.string(),
    jobContext: joi.string(),
    applyEmail: joi.string().email().optional(),
    jobBenefit: joi.string(),
    deadline: joi.date(),
    jobResponsibilities: joi.string(),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    await PostJobModel.create({ ...req.body, createdPost: userId });
    res.status(201).json({ message: "job created successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

//get all jobs
export const getAllJob = async (req, res) => {
  const search = req.query.search || "";
  const perPage = req.query.per_page || 10;
  const page = req.query.page || 1;
  const location = req.query.location || "all";
  const salary = req.query.salary || "any";
  const experience = req.query.experience || "any";
  const employmentType = req.query.employmentType || "any";
  const category = req.query.category || "";
  const organization = req.query.organization || "";

  // const currentDate = new Date();
  // const filterByDate = new Date(currentDate - postDate * 24 * 60 * 60 * 1000);

  //query
  const query = {};

  if (search) {
    query.jobTitle = { $regex: search, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  if (salary !== "any") {
    query.salary = { $lte: salary };
  }
  if (organization) {
    query.organizationType = organization;
  }

  // if (postDate !== "all") {
  //   query.createdAt = { $gte: filterByDate, $lt: currentDate };
  // }

  if (location !== "all") {
    query.location = location;
  }

  if (experience !== "any") {
    query.experienceLevel = experience;
  }

  if (employmentType !== "any") {
    query.employmentType = employmentType;
  }

  try {
    const jobs = await PostJobModel.find(query)
      .populate("createdPost", "companyName image_url -_id")
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip((page - 1) * perPage);
    const totalDocuments = await PostJobModel.countDocuments(query);
    const totalPage = Math.ceil(totalDocuments / perPage);

    res.status(200).json({
      metadata: {
        totalPage,
        totalDocuments,
        lastPage: totalPage,
      },
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

//suggestion search
export const suggestion = async (req, res) => {
  const search = req.query.search;

  const query = {};

  if (search) {
    query.jobTitle = { $regex: search, $options: "i" };
  }

  try {
    const data = await PostJobModel.find(query).limit(10);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get job by id
export const getJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await PostJobModel.findById({ _id: jobId })
      .sort({
        createdAt: 1,
      })
      .populate("createdPost");
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get job by user id
export const getJobByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const job = await PostJobModel.find({ userId: userId }).populate(
      "createdPost"
    );
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get job by user id
export const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    await PostJobModel.findByIdAndDelete({ _id: jobId }, { new: true });
    res.status(200).json({ message: "Delete successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get category
export const getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const jobCategory = await PostJobModel.find({ category: category });
    res.status(200).json(jobCategory);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//update a job
export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const {
    companyName,
    jobTitle,
    vacancy,
    location,
    education,
    organizationType,
    workPlace,
    salary,
    jobContext,
    JobResponsibilities,
    Benefits,
    applyEmail,
    deadline,
    userId,
  } = req.body;
  const schema = joi.object({
    companyName: joi.string().min(5).max(100),
    jobTitle: joi.string().min(5).max(100),
    education: joi.string().min(5).max(100),
    userId: joi.string(),
    location: joi.string().min(5).max(100),
    organizationType: joi.string(),
    salary: joi.number(),
    workPlace: joi.string(),
    vacancy: joi.string(),
    jobContext: joi.string(),
    applyEmail: joi.string().email().optional(),
    Benefits: joi.string(),
    deadline: joi.date(),
    JobResponsibilities: joi.string(),
  });

  //   from validation field
  const { error } = schema.validate(req.body);
  if (error) res.status(400).json({ message: error.details[0].message });
  try {
    await PostJobModel.findByIdAndUpdate(
      { _id: jobId },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "job update successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get total job
export const getTotalJob = async (req, res) => {
  try {
    const totalJob = await PostJobModel.countDocuments();
    const totalCompany = await EmployerModel.countDocuments();
    const totalVacancy = await PostJobModel.aggregate([
      {
        $group: {
          _id: null,
          totalVacancy: { $sum: "$vacancy" },
        },
      },
    ]);
    res.status(200).json({ totalJob, totalCompany, totalVacancy });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
