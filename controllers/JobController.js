const Job = require("../models/jobModel");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Company = require("../models/companyModel");


// Create a new job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      type,
      location,
      salaryMin,
      salaryMax,
      description,
      requirements,
      benefits,
    } = req.body;
    const token = req.params.token
    console.log("location",location,token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
    const userId = decoded.id; 
    console.log("userId",userId)

    const newJob = new Job({
      employerId:userId,
      title,
      type,
      location,
      salaryMin,
      salaryMax,
      description,
      requirements: requirements.split('\n').filter(Boolean), // Splitting lines
      benefits: benefits.split('\n').filter(Boolean), // Splitting lines
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

// exports.getJobs = async (req, res)=>{
//   try {
//     const { token } = req.params; // Extract employerId from the route params
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
//     const employerId = decoded.id; 

//     // Fetch all jobs where employerId matches
//     const jobs = await Job.find({ employerId });

//     if (!jobs.length) {
//       return res.status(404).json({ message: 'No jobs found for this employer' });
//     }

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }
exports.getJobs = async (req, res) => {
  try {
    const { token } = req.params;

    // Decode the token
    let employerId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Payload:", decoded);
      employerId = new mongoose.Types.ObjectId(decoded.id);
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Aggregation pipeline with $lookup
    const jobs = await Job.aggregate([
      {
        $match: { employerId }, // Filter jobs by employerId
      },
      {
        $lookup: {
          from: 'companies', // Ensure collection name matches your database
          localField: 'employerId',
          foreignField: 'employerId',
          as: 'company',
        },
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true },
      },
    ]);

    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this employer' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateJob = async (req, res) => {
  try {
    const { jobId, token } = req.params; // jobId and token from the route parameters
    const {
      title,
      type,
      location,
      salaryMin,
      salaryMax,
      description,
      requirements,
      benefits,
    } = req.body;

    // Verify token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    const userId = decoded.id;

    // Find the job to update
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Ensure that the user updating the job is the job's employer
    if (job.employerId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this job' });
    }

    // Update the job details
    job.title = title || job.title;
    job.type = type || job.type;
    job.location = location || job.location;
    job.salaryMin = salaryMin || job.salaryMin;
    job.salaryMax = salaryMax || job.salaryMax;
    job.description = description || job.description;
    job.requirements = requirements
      ? requirements.split('\n').filter(Boolean)
      : job.requirements;
    job.benefits = benefits
      ? benefits.split('\n').filter(Boolean)
      : job.benefits;

    await job.save(); // Save the updated job

    res.status(200).json({ message: 'Job updated successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};





// Route for fetching a single job by its ID
exports.getJobById = async (req, res) => {
  try {
    const { id, token } = req.params; // Extract job ID and token from the request params
    const jobId = id;

    // Decode the token to get the employer ID
    let employerId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Payload:", decoded);
      employerId = new mongoose.Types.ObjectId(decoded.id);
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Validate the job ID format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    // Aggregation pipeline to fetch the job with associated company details
    const jobDetails = await Job.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(jobId), employerId }, // Match the job ID and employer ID
      },
      {
        $lookup: {
          from: 'companies', // Ensure this matches your database collection name
          localField: 'employerId',
          foreignField: 'employerId',
          as: 'company',
        },
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true }, // Include company details if available
      },
    ]);

    if (!jobDetails.length) {
      return res.status(404).json({ message: "Job not found or you do not have access to this job" });
    }

    res.status(200).json(jobDetails[0]); // Return the single job details
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.AllgetJobs = async (req, res) => {
  try {
    console.log("Hoi")

    const { token } = req.params;
    console.log("Hoi")

    // Decode the token
    let employerId;
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("Decoded Token Payload:", decoded);
    //   employerId = new mongoose.Types.ObjectId(decoded.id);
    // } catch (error) {
    //   console.error("Token Verification Error:", error.message);
    //   return res.status(401).json({ message: "Invalid or expired token" });
    // }

    // Aggregation pipeline with $lookup
    const jobs = await Job.aggregate([
      // {
      //   $match: { employerId }, // Filter jobs by employerId
      // },
      {
        $lookup: {
          from: 'companies', // Ensure collection name matches your database
          localField: 'employerId',
          foreignField: 'employerId',
          as: 'company',
        },
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true },
      },
    ]);


    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this employer' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserJobById = async (req, res) => {
  try {
    const { id } = req.params; // Extract job ID and token from the request params
    const jobId = id;

    // Decode the token to get the employer ID
    // let employerId;
    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("Decoded Token Payload:", decoded);
    //   employerId = new mongoose.Types.ObjectId(decoded.id);
    // } catch (error) {
    //   console.error("Token Verification Error:", error.message);
    //   return res.status(401).json({ message: "Invalid or expired token" });
    // }

    // Validate the job ID format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    // Aggregation pipeline to fetch the job with associated company details
    const jobDetails = await Job.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(jobId) }, // Match the job ID and employer ID
      },
      {
        $lookup: {
          from: 'companies', // Ensure this matches your database collection name
          localField: 'employerId',
          foreignField: 'employerId',
          as: 'company',
        },
      },
      {
        $unwind: { path: '$company', preserveNullAndEmptyArrays: true }, // Include company details if available
      },
    ]);

    if (!jobDetails.length) {
      return res.status(404).json({ message: "Job not found or you do not have access to this job" });
    }

    res.status(200).json(jobDetails[0]); // Return the single job details
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Server error" });
  }
};


 exports.getJobsByCompany = async (req, res) => {
  const { companyId } = req.params;
  console.log("companyId",companyId)

  try {
    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ message: 'Invalid company ID format' });
    }

    // Step 1: Get employerId from the Company collection using companyId
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const employerId = company.employerId;

    // Step 2: Fetch all jobs using the retrieved employerId
    const jobs = await Job.find({ employerId });

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this company' });
    }

    // Step 3: Return the job details
    res.status(200).json({ companyDetails: company, jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Failed to fetch jobs for the company' });
  }
};

