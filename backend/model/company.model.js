import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const financialSchema = new mongoose.Schema({
    revenue: { type: Number, required: true },
    expenses: { type: Number, required: true },
    profit: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Company Schema
const companySchema = new Schema({
    name: { type: String, required: true }, // Company name
    thesis: { type: Schema.Types.ObjectId, ref: 'Thesis', required: true }, // Linked to the Thesis
    businessModel: { type: String, required: true }, 
    coreValues: { type: String }, 
    country:{type:String},
    roadmap: [
        {
            phase: String,
            tasks: [{ description: String,completed:Boolean }] // Task description in each phase
        }
    ],
    team: [{ 
        type:Schema.Types.ObjectId, ref:'Contact',
    }],
    deal: { 
        involvement: String // RH's involvement in the deal (e.g., partner, investor)
    },
    financials:[financialSchema], // Financial analytics of the business
    updates: [{ type: String }], // Markdown field for updates
    image:{type:String}
});

// Timestamps on save
companySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Company = mongoose.model('Company', companySchema);
export default Company;
