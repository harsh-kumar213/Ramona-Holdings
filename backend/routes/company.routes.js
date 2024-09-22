import express from 'express';
import {
    createCompany,
    getCompanyById,
    updateCompany,
    updateCompanyFinancials,
    addUpdatesToCompany
} from '../controllers/company.controller.js';

const router = express.Router();
router.post('/',createCompany);
router.route('/:id')
    .get(getCompanyById)
    .patch(updateCompany);

router.route('/financials/:id')
    .patch(updateCompanyFinancials);

router.route('/updates/:id')
    .patch(addUpdatesToCompany);

export default router;
