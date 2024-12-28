const SavedJob = require("../models/savedJobModel");


exports.saveJob = async (req, res) => {
    try {
      const { jobId } = req.body;
      const seekerId = req.user.id; // Extracted from token
  
      // Check if the job is already saved by this seeker
      const existingSave = await SavedJob.findOne({ jobId, seekerId });
      if (existingSave) {
        return res.status(400).json({ message: "Job already saved" });
      }
  
      // Create a new saved job entry
      const savedJob = new SavedJob({ jobId, seekerId });
      await savedJob.save();
  
      return res.status(200).json({ message: "Job saved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.checkSavedStatus = async (req, res) => {
    try {
      const { jobId } = req.params;
      const seekerId = req.user.id; // Extracted from token
  
      const savedJob = await SavedJob.findOne({ jobId, seekerId });
  
      if (savedJob) {
        return res.status(200).json({ saved: true });
      } else {
        return res.status(200).json({ saved: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };