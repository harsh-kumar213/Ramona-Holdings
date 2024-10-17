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


const stakeholderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, 
    bringsToTable:[{type:String}],
    takesFromTable:[{type:String}]
});

// Main Deal schema
const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    stakeholders: [stakeholderSchema], 
    country:{type:String},
    roadmap: [phaseSchema], 
    financials: { type: Number }, // Financial details
    image: { type: String },
}, { timestamps: true });

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
