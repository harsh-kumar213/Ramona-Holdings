import Company from '../model/company.model.js';
import Thesis from '../model/theses.model.js';


// create a company
const createCompany = async(req,res)=>{
    try {
        
        const {name,businessModel,coreValues,country,thesisId,deal,team,roadmap,financials,updates}=req.body;
       
        if(!name || !businessModel || !thesisId || !team || !roadmap )
           return res.status(400).json({msg:"not enough information to create the company"});
        const thesis = await Thesis.findOne({_id:thesisId});
        if(!thesis)
            res.status(404).json({error:"the given thesis not exist "});
        const roadmapObjects = roadmap.map(phase => ({
            phase: phase.phase,
            tasks: phase.tasks.map(task => ({
                description: task.description,
                completed: task.completed || false 
            }))
        }));
        const newCompany = new Company({
            name,
            businessModel,
            coreValues,
            thesis:thesisId,
            deal,
            country,
            team,
            roadmap:roadmapObjects,
            financials,
            updates,
            image:req.file?req.file.path:null
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
       
        const company = await Company.findById(req.params.id)
          .populate('thesis', 'title') 
          .populate('team','fullName'); 
    
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
    
        res.status(200).json(company);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
};

// Update company
const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const { name, coreValues,country, businessModel, roadmap } = req.body;

        console.log(name,coreValues,businessModel,roadmap,country);
        if (!name || !coreValues || !businessModel || !Array.isArray(roadmap)) {
            return res.status(400).json({ error: 'Missing or invalid fields' });
        }

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ error: 'No company found' });
        }

        
        company.name = name || company.name;
        company.coreValues = coreValues || company.coreValues;
        company.businessModel = businessModel || company.businessModel;
        company.country = country || company.country;
        
        if (Array.isArray(roadmap)) {
            company.roadmap = roadmap.map((phase) => ({
                phase: phase.phase, 
                tasks: phase.tasks.map((task) => ({
                    description: task.description,
                    completed: task.completed || false, 
                })),
            }));
        }

        await company.save();
        res.status(200).json(company); 
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ error: 'Server error while updating company' });
    }
};

const getAllCompanies =async(req,res)=>{
    try {
        console.log("asking for companies")
        const companies = await Company.find();
        if(!companies)
            return res.status(404).json({error:"no companies found"});
        console.log(companies);
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({msg:"internal server error"});
    }
}


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

export {createCompany,getCompanyById,updateCompany,updateCompanyFinancials,addUpdatesToCompany,getAllCompanies};
