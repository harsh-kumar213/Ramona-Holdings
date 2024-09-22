import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Thesis Schema
const thesisSchema = new Schema({
    title: { type: String, required: true, unique: true }, // Title of the thesis (e.g., Renewable Energy)
    description: { type: String, required: true }, // Thesis description
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamps on save
thesisSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Thesis = mongoose.model('Thesis', thesisSchema);
export default Thesis;
