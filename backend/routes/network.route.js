import express from 'express';
import {createContact ,getAllContacts,getContactById,updateContact,deleteContact} from '../controllers/network.controller.js';
import upload from '../middleware/upload.middleware.js';
const router = express.Router();


// GET all contacts (with search)
router.get('/', getAllContacts);

// GET a single contact by ID
router.route('/:id').get( getContactById).delete(deleteContact);
router.patch('/:id',upload.single('image'),updateContact);

// POST create a new contact
router.post('/',upload.single("image"), createContact);


export default router;
