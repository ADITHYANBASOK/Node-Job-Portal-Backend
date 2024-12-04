const express = require('express');
const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

router.route('/:token').get(getCompanies).post(addCompany);
router.route('/:token').put(updateCompany).delete(deleteCompany);

module.exports = router;
