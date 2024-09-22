import express from 'express';
import {
    createDealWithImage,
    getAllDeals,
    getDealById,
    updateTaskStatus,
    updateDeal,
    
} from '../controllers/deals.controller.js';
import upload from '../middleware/upload.middleware.js'; // Image upload middleware

const router = express.Router();

// Get all deals
router.get('/', getAllDeals);

// Get deal by ID
router.get('/:id', getDealById);

// Create a new deal with image upload
router.post('/', upload.single('image'), createDealWithImage);


// Update general deal information (title, bio, etc.)
router.patch('/:id', updateDeal);

// Update task status (mark as complete or incomplete)
router.patch('/:id/roadmap/task', updateTaskStatus);



export default router;
