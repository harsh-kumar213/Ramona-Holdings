import express from 'express';
import { getAllIdeas, getIdeaById, createIdea, updateIdea, addSuggestion } from '../controllers/idea.controller.js';
import upload from '../middleware/upload.middleware.js'; 

const router = express.Router();

// Correctly chaining routes with paths
console.log("reached the routes")
router.route('/')
  .get(getAllIdeas)
  .post(upload.single("image"),createIdea);

router.route('/:id')
  .get(getIdeaById)
  
router.patch('/:id',upload.single("image"),updateIdea);

router.route('/suggestions/:id')
  .post(addSuggestion);

export default router;
