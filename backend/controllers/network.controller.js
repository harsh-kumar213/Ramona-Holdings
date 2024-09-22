import Contact from '../model/network.model.js';

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { fullName, occupation, country, socialMedia, skills, relationshipTracking, mutualConnections, notes } = req.body;
        console.log(socialMedia,skills,relationshipTracking);
        const newContact = new Contact({
            fullName,
            occupation,
            country,
            socialMedia:JSON.parse(socialMedia),
            skills:JSON.parse(skills),
            relationshipTracking:JSON.parse(relationshipTracking),
            mutualConnections,
            notes,
            image: req.file ? req.file.path : null
        });
        
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: 'Failed to create contact' });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const search = req.query.search || '';
        const contacts = await Contact.find({ fullName: { $regex: search, $options: 'i' } }); // Case-insensitive search
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).populate('mutualConnections');
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
};

const updateContact = async(req,res)=>{
    try {
        const id = req.params.id;
        const updateData = {...req.body}
        if (req.file) {
            updateData.image = req.file.path;  // Update with the new image path
        }
        const updatedContact = await Contact.findByIdAndUpdate(id,updateData,{new:true,runValidators:true});
        if(!updatedContact)
            res.status(404).json({error:"contact not found"});
        res.status(200).json(updatedContact);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const deleteContact  = async(req,res)=>{
    try {
        const id=  req.params.id;
        const deletedContact = await Contact.findOneAndDelete(id);
        if(!deletedContact)
            res.status(500).json({error:"unable to delete"});
        res.status(200).json({msg:"contact deleted"});
    } catch (error) {
        console.log("error in the contact delete controller");
        res.status(500).json("Internal Server Error");
    }
}

export {createContact,getAllContacts,getContactById,updateContact,deleteContact};


