import express from 'express';
import {
    createTheses,
    updateTheses,
    getAllTheses,
    getCompaniesUnderThesis,
    getThesisById
} from '../controllers/theses.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllTheses).post(createTheses);

router.route('/:id')
    .get(getThesisById).patch(updateTheses);

router.route('/companies/:id')
    .get(getCompaniesUnderThesis);

export default router;
