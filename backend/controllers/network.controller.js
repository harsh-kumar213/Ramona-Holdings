import Contact from '../model/network.model.js';

// Create a new contact
const createContact = async (req, res) => {
    try {
        const { fullName, occupation,bio, country,industry,affiliation,status, socialMedia, skills, relationshipTracking, mutualConnections, notes } = req.body;
        console.log(fullName, occupation, country, socialMedia, skills, relationshipTracking, mutualConnections, notes);
        const newContact = new Contact({
            fullName,
            occupation,
            country,
            bio,
            industry,
            affiliation,
            status,
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

const updateContact = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = { ...req.body };
      
      // Parse fields that are passed as JSON from the form data
      updatedData.skills = JSON.parse(updatedData.skills);
      updatedData.relationshipTracking = JSON.parse(updatedData.relationshipTracking);
      updatedData.socialMedia = JSON.parse(updatedData.socialMedia);
  
      // Retrieve the existing contact
      const existingContact = await Contact.findById(id);
  
      if (!existingContact) {
        return res.status(404).json({ error: "Contact not found" });
      }
  
      // Update kappa by pushing new entries if valid
      if (updatedData.relationshipTracking && updatedData.relationshipTracking.kappa) {
        if (!Array.isArray(existingContact.relationshipTracking.kappa)) {
          existingContact.relationshipTracking.kappa = [];
        }
        // Add the new kappa entries
        existingContact.relationshipTracking.kappa.push(...updatedData.relationshipTracking.kappa);
      }
  
      // Update the image if a file is uploaded
      if (req.file) {
        existingContact.image = req.file.path;
      }
  
      // Update other fields
      existingContact.fullName = updatedData.fullName || existingContact.fullName;
      existingContact.occupation = updatedData.occupation || existingContact.occupation;
      existingContact.country = updatedData.country || existingContact.country;
      existingContact.industry = updatedData.industry || existingContact.industry;
      existingContact.bio = updatedData.bio || existingContact.bio;
      existingContact.status = updatedData.status || existingContact.status;
      existingContact.affiliation = updatedData.affiliation || existingContact.affiliation;
      existingContact.skills = updatedData.skills;
      existingContact.socialMedia = updatedData.socialMedia;
      existingContact.notes = updatedData.notes || existingContact.notes;
  
      // Save the updated contact
      const updatedContact = await existingContact.save();
  
      res.status(200).json(updatedContact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  

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


