import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    fullName: { type: String, required: true },
    occupation: { type: String, required: true },
    country:{type:String,required:true}, 
    bio:{type:String,required:true},
    industry:{type:String,required:true},
    status:{type:String,required:true},
    affiliation:{type:String,required:true},
    socialMedia: {
        linkedIn: { type: String },
        twitter: { type: String },
        email: { type: String }
    },
    skills: [{
        skillName: { type: String, required: true },
    }],
    relationshipTracking: {
        whatTheyCanProvide: { type: [String] },
        whatTheyNeed: { type: [String] },
        flags: { type: String, enum: ['Red', 'Yellow', 'Green'] },
        karmaPoints: { type: Number, default: 0 }, // Favor system tracking
        kappa: [{
            time: {
              type: Date,
              required: true
            },
            value: {
              type: Number,
              required: true
            }
          }]
    },
    mutualConnections: [{ type: Schema.Types.ObjectId, ref: 'Contact' }], // Reference to other contacts
    notes: { type: String }, // Markdown notes field
    image:{type:String}
    
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
