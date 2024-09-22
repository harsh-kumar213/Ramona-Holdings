import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullName: { type: String, required: true },
    occupation: { type: String, required: true },
    country:{type:String,required:true}, // List of countries they are affiliated with
    socialMedia: {
        linkedIn: { type: String },
        twitter: { type: String },
        email: { type: String }
    },
    skills: [{
        skillName: { type: String, required: true },
    }],
    relationshipTracking: {
        whatTheyCanProvide: { type: String },
        whatTheyNeed: { type: String },
        flags: { type: String, enum: ['Red', 'Yellow', 'Green'] },
        karmaPoints: { type: Number, default: 0 }, // Favor system tracking
        kappa: [{ time: Date, value: Number }] // κ vs t graph data
    },
    mutualConnections: [{ type: Schema.Types.ObjectId, ref: 'Contact' }], // Reference to other contacts
    notes: { type: String }, // Markdown notes field
    image:{type:String}
    
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
