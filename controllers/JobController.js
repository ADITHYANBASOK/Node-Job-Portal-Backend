const Job = require("../models/jobModel");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


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
