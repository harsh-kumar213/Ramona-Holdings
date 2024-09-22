import Thesis from '../model/theses.model.js';
import Company from '../model/company.model.js';


// create a theses
const createTheses = async(req,res)=>{
    try {
        const {title,description} = req.body;
        if(!title || !description)
            res.staus(400).json({error:"not enough data"})
        const newThesis = new Thesis({
            title,
            description,
        })
        await newThesis.save();
        res.status(200).json(newThesis);
    } catch (error) {
        console.log("error in the theses create controller",error);
        res.status(500).json({msg:"Internal Server Error"});
    }
}

//updateTheses
const updateTheses  = async(req,res)=>{
    try {
        const id = req.params.id;
        const updateData = {...req.body};
        const updatedTheses = await Thesis.findByIdAndUpdate(id,updateData,{new:true,runValidators:true});
        if(!updatedTheses)
            res.status(400).json({error:"update failed"});
        res.status(200).json(updatedTheses);
    } catch (error) {
        console.log("error in the update theses controller",error);
        res.status(500).json("Internal Server Error");
    }
}
// Get all theses
 const getAllTheses = async (req, res) => {
    try {
        const theses = await Thesis.find();
        res.json(theses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch theses' });
    }
};

// Get companies under a specific thesis
 const getCompaniesUnderThesis = async (req, res) => {
    try {
        const companies = await Company.find({ thesis: req.params.id });
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
};

// Get thesis by ID
 const getThesisById = async (req, res) => {
    try {
        const thesis = await Thesis.findById(req.params.id);
        if (!thesis) return res.status(404).json({ error: 'Thesis not found' });
        res.json(thesis);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch thesis' });
    }
};

export {createTheses,updateTheses,getAllTheses,getCompaniesUnderThesis,getThesisById};
