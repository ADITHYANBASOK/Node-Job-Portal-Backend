const express = require('express');
const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

router.route('/').get(getCompanies).post(addCompany);
router.route('/:id').put(updateCompany).delete(deleteCompany);

module.exports = router;
