import Deal from '../model/deals.model.js';


export const createDealWithImage = async (req, res) => {
    
    const { title, summary,country,stakeholders,roadmap ,financials } = req.body;
    


    // Creating Stakeholders array using the model structure
    const stakeholdersObjects = stakeholders.map(stakeholder => ({
        name: stakeholder.name,
        role: stakeholder.role,
        bringsToTable: stakeholder.bringsToTable || [], // If provided, else empty array
        takesFromTable: stakeholder.takesFromTable || [] // If provided, else empty array
    }));

    // Creating Roadmap array with phases and tasks
    const roadmapObjects = roadmap.map(phase => ({
        phase: phase.phase,
        tasks: phase.tasks.map(task => ({
            description: task.description,
            completed: task.completed || false // Default to false if not provided
        }))
    }));

    console.log(title, summary, stakeholdersObjects, roadmapObjects, financials); // Debugging

    try {
        // Create a new deal object based on the schema
        const newDeal = new Deal({
            title,
            summary,
            country,
            stakeholders: stakeholdersObjects, // Attach structured stakeholders
            roadmap: roadmapObjects,           // Attach structured roadmap
            financials: Number(financials),     // Convert financials to a number
            image: req.file ? req.file.path : null // Save image if provided
        });

        console.log(newDeal); // Debugging the new deal object
        await newDeal.save(); // Save the deal to the database
        
        res.status(201).json(newDeal); // Respond with the created deal object
    } catch (error) {
        console.error('Error creating deal:', error); // Handle any errors
        res.status(500).json({ message: 'Error creating deal', error });
    }
};



// Get all deals
export const getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deals', error });
    }
};

// Get deal by ID
export const getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) return res.status(404).json({ message: 'Deal not found' });
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deal', error });
    }
};


// Update task status (completed or not)
export const updateTaskStatus = async (req, res) => {
    const { phaseId, taskId, completed } = req.body;

    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) return res.status(404).json({ message: 'Deal not found' });
        console.log(deal);
        const phase = deal.roadmap.id(phaseId);
        if (!phase) return res.status(404).json({ message: 'Phase not found' });
        console.log(phase)
        const task = phase.tasks.id(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        console.log(task)
        task.completed = completed;
        await deal.save();
        res.status(200).json(deal);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating task status', error });
    }
};

export const updateDeal = async (req, res) => {
    try {
      const dealId = req.params.id; // Get the deal ID from the request parameters
      const {
        title,
        summary,
        financials,
        country,
        stakeholders, // Expecting an array of stakeholder objects
        roadmap, // Expecting an array of phase objects
      } = req.body;
  
      // Find the deal by ID
      const deal = await Deal.findById(dealId);
  
      if (!deal) {
        return res.status(404).json({ message: 'Deal not found' });
      }
  
      // Update deal properties
      deal.title = title;
      deal.summary = summary;
      deal.financials = financials;
      console.log(deal.country,country);
      deal.country = country||deal.country;
  
      // Update stakeholders
      deal.stakeholders = stakeholders.map((stakeholder) => ({
        name: stakeholder.name,
        role: stakeholder.role,
        type: stakeholder.type,
        bringsToTable: Array.isArray(stakeholder.bringsToTable) ? stakeholder.bringsToTable : [], // Ensure it's an array
        takesFromTable: Array.isArray(stakeholder.takesFromTable) ? stakeholder.takesFromTable : [], // Ensure it's an array
      }));
  
      // Update roadmap
      deal.roadmap = roadmap.map((phase) => ({
        phase: phase.phase, // Ensure you are sending the phase string
        tasks: phase.tasks.map((task) => ({
          description: task.description,
          completed: task.completed || false, // Default to false if not provided
        })),
      }));
  
      // Save the updated deal
      await deal.save();
  
      return res.status(200).json(deal); // Return the updated deal
    } catch (error) {
      console.error('Error updating deal:', error);
      return res.status(500).json({ message: 'Failed to update deal', error });
    }
  };
  
  

