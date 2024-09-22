import Idea from "../model/Idea.model.js"
import fs from 'fs';
// Get all ideas
const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single idea by title
const getIdeaById = async (req, res) => {
  console.log(req.params)
  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new idea
const createIdea = async (req, res) => {
   const {title,content} = req.body;
   console.log(title,content);
  try {
    const newIdea = new Idea({ 
      title,
      content,
      image: req.file ? req.file.path : null, // Store the path to the uploaded image
      suggestions: JSON.parse(req.body.suggestions || '[]'), // Parse suggestions if sent as JSON string
     });
    await newIdea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an existing idea
const updateIdea = async (req, res) => {
  try {
    console.log("In the update controller");
    console.log(req.params);

    const ideaId = req.params.id; // Get the idea ID from the route
    const updateData = { ...req.body }; // Get the data from the request body

    // If no new image is provided, keep the existing image
    const existingIdea = await Idea.findById(ideaId);
    if (!existingIdea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    // Keep the existing image if no new image is provided
    if (!req.body.image) {
      updateData.image = existingIdea.image; // Preserve the old image
    }

    // Find and update the idea
    const updatedIdea = await Idea.findByIdAndUpdate(
      ideaId,
      updateData,
      { new: true, runValidators: true } // Return the updated document and validate against the schema
    );

    res.json(updatedIdea); // Send the updated idea back
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// Add a suggestion to an idea
const addSuggestion = async (req, res) => {
  try {
    const idea = await Idea.findOne({ _id: req.params.id });
    if (!idea) return res.status(404).json({ message: "Idea not found" });

    const { suggestedBy, suggestionText,status } = req.body;
    idea.suggestions.push({ suggestedBy, suggestionText,status });
    await idea.save();

    res.status(201).json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {getAllIdeas,getIdeaById,createIdea,updateIdea,addSuggestion}