import Company from '../model/company.model.js';
import Thesis from '../model/theses.model.js';


// create a company
const createCompany = async(req,res)=>{
    try {
        const {name,businessModel,coreValues,thesisId,deal,team,roadmap,financials,updates}=req.body;
        if(!name || !businessModel || !thesisId || !team || !roadmap )
            res.status(400).json({msg:"not enough information to create the company"});
        const thesis = await Thesis.findOne({_id:thesisId});
        if(!thesis)
            res.status(404).json({error:"the given thesis not exist "});
        const newCompany = new Company({
            name,
            businessModel,
            coreValues,
            thesis:thesisId,
            deal,
            roadmap,
            financials,
            updates
        })
        await newCompany.save();
        if(!newCompany)
            res.status(500).json({error:"couldn't create the company"});
        res.status(200).json(newCompany);
    } catch (error) {
        console.log("error in the create company controller",error);
        res.status(500).json({error:"internal server error"})
    }
}
// Get company by ID
 const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch company' });
    }
};

// Update company
 const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) return res.status(404).json({ error: 'Company not found' });
        res.json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update company' });
    }
};


// Update company financials
 const updateCompanyFinancials = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        
        company.financials.push(req.body.financials); // Assuming financials is an array in the model
        await company.save();
        
        res.json(company);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update financials' });
    }
};

// Add updates to the company
 const addUpdatesToCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });

        company.updates.push(req.body.update); // Assuming updates is an array in the model
        await company.save();
        
        res.json(company);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add update' });
    }
};

export {createCompany,getCompanyById,updateCompany,updateCompanyFinancials,addUpdatesToCompany};
