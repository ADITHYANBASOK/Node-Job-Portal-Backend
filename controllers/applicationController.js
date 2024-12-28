const Application = require('../models/applicationModel');
const Company = require('../models/companyModel');
const Job = require('../models/jobModel');
const SavedJob = require('../models/savedJobModel');
const User = require('../models/userModel'); // Assuming you have a user model




// @desc Apply for a job
// @route POST /api/applications
// @access Private (only authenticated users)
const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const seekerId = req.user.id; // Extracted from JWT in middleware

  try {
    // Validate Job ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({ jobId, seekerId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create application
    const application = await Application.create({
      jobId,
      seekerId,
      employerId: job.employerId, // Assuming job has an employerId field
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Error applying for job:', error.message);
    res.status(500).json({ message: 'Failed to apply for job' });
  }
};

// @desc Get all applications for a job seeker
// @route GET /api/applications
// @access Private
const getSeekerApplications = async (req, res) => {
  const seekerId = req.user.id;

  try {
    // Fetch applications for the given seekerId
    const applications = await Application.find({ seekerId }).populate('jobId employerId');

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this seeker.' });
    }

    // Map applications to AppliedJob format
    const appliedJobs = await Promise.all(
      applications.map(async (application) => {
        const job = await Job.findById(application.jobId);
        const company = await Company.findOne({employerId:job.employerId});
        console.log("job",job,"company",company)

        return {
          id: application._id,
          title: job.title,
          company: company.name,
          appliedDate: application.appliedAt.toISOString(),
          status: application.status,
        };
      })
    );

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Error fetching applied jobs', error });
  }
}

// @desc Get all applications for an employer
// @route GET /api/applications/employer
// @access Private
const getEmployerApplications = async (req, res) => {
  const employerId = req.user.id;

  try {
    const applications = await Application.find({ employerId }).populate('jobId', 'title').populate('seekerId' ,'name email');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching employer applications:', error.message);
    res.status(500).json({ message: 'Failed to fetch employer applications' });
  }
};

const getCheckApplications = async (req, res) => {
    try {
      const { jobId } = req.params;
      const seekerId = req.user.id; // Extracted from token by middleware
      console.log(jobId,seekerId)
  
      const application = await Application.findOne({ jobId, seekerId });
  
      if (application) {
        return res.json({ applied: true });
      } else {
        return res.json({ applied: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }


  const updateApplicationStatus = async (req, res) => {
    const { applicationId, newStatus } = req.body;
    console.log(applicationId,newStatus)
  
    // Validate newStatus against allowed statuses
    const allowedStatuses = ['pending', 'reviewing', 'shortlisted', 'rejected'];
    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid application status' });
    }
  
    try {
      // Find the application by ID
      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Update the status
      application.status = newStatus;
      await application.save();
  
      res.status(200).json({ message: 'Application status updated successfully', application });
    } catch (error) {
      console.error('Error updating application status:', error.message);
      res.status(500).json({ message: 'Failed to update application status' });
    }
  };

  const getApplicationCountBySeeker = async (req, res) => {
    try {
        const seekerId = req.user.id; // Extracted from token by middleware

        // Count applications for the seeker
        const applicationCount = await Application.countDocuments({ seekerId });

        // Count saved jobs for the seeker
        const savedJobCount = await SavedJob.countDocuments({ seekerId });

        return res.json({ seekerId, applicationCount, savedJobCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getApplicationCountByEmployer = async (req, res) => {
  try {
      const employerId = req.user.id; // Extracted from token by middleware

      // Count applications for jobs posted by the employer
      const applicationCount = await Application.countDocuments({ employerId });

      // Count total jobs posted by the employer
      const jobPostedCount = await Job.countDocuments({ employerId });

      return res.json({ employerId, applicationCount, jobPostedCount });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  applyForJob,
  getSeekerApplications,
  getEmployerApplications,
  getCheckApplications,
  updateApplicationStatus,
  getApplicationCountBySeeker,
  getApplicationCountByEmployer
};
