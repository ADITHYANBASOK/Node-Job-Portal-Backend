const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');

// @desc Get all companies
// @route GET /api/companies
// @access Public
const getCompanies = async (req, res) => {
  try {
    const token = req.params.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
    const userId = decoded.id; 
    console.log("userId",userId)
    const companies = await Company.find({ employerId: userId });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new company
// @route POST /api/companies
// @access Public
const addCompany = async (req, res) => {
  const { name, description, industry, website, location, size, email, phone } = req.body;
  const token = req.params.token
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
  const userId = decoded.id; 

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  try {
    const company = new Company({ employerId: userId , name, description, industry, website, location, size, email, phone });
    const createdCompany = await company.save();
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update company details
// @route PUT /api/companies/:id
// @access Public
const updateCompany = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key here
  const userId = decoded.id; 
  console.log("userId",userId)

  try {
    const company = await Company.findOneAndUpdate({employerId :userId}, req.body, { new: true });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a company
// @route DELETE /api/companies/:id
// @access Public
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCompanies, addCompany, updateCompany, deleteCompany };
