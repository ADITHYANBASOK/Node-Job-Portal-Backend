const express = require('express');
const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
} = require('../controllers/companyController');

const router = express.Router();

router.route('/:token').get(getCompanies).post(addCompany);
router.route('/:token').put(updateCompany).delete(deleteCompany);
router.route('/').get(getAllCompanies);
router.route('/singlecompany/:id').get(getCompanyById);



module.exports = router;
