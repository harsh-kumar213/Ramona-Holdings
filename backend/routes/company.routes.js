import express from 'express';
import {
    createCompany,
    getCompanyById,
    updateCompany,
    updateCompanyFinancials,
    addUpdatesToCompany,
    getAllCompanies
} from '../controllers/company.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();
router.post('/',upload.single('image'),createCompany);
router.route('/:id')
    .get(getCompanyById)

router.patch('/:id',upload.single('image'),updateCompany);
router.get('/map',(req,res,next)=>{console.log("route hit");next()},getAllCompanies);
router.route('/financials/:id')
    .patch(updateCompanyFinancials);

router.route('/updates/:id')
    .patch(addUpdatesToCompany);

export default router;
