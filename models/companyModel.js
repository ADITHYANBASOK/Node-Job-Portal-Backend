const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    industry: { type: String },
    website: { type: String },
    location: { type: String },
    size: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
