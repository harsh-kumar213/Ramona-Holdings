import mongoose from 'mongoose';

// Task schema for phases
const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

// Phase schema with tasks
const phaseSchema = new mongoose.Schema({
    phase: { type: String, required: true },
    tasks: [taskSchema],
});

// Stakeholder schema for detailed stakeholder information
const stakeholderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, // Example: Buyer, Seller, Broker, etc.
    contactInfo: { type: String }, // Can be email, phone, etc.
    affiliation: { type: String }, // Their company or organization
    involvement: { type: String }, // How they're involved in the deal
});

// Main Deal schema
const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    bio: { type: String },
    stakeholders: [stakeholderSchema], // Array of stakeholders with detailed info
    roadmap: [phaseSchema], // Array of phases, each containing tasks
    financials: { type: Number }, // Financial details
    image: { type: String }, // Path to the uploaded image
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
