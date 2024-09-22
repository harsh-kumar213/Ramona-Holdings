import Deal from '../model/deals.model.js';

// Create a new deal with image upload
export const createDealWithImage = async (req, res) => {
    const { title, summary, bio, stakeholders, roadmap, financials } = req.body;

    try {
        const newDeal = new Deal({
            title,
            summary,
            bio,
            stakeholders: JSON.parse(stakeholders), // Parse the stakeholders array
            roadmap:JSON.parse(roadmap),
            financials,
            image: req.file ? req.file.path : null
        });

        await newDeal.save();
        res.status(201).json(newDeal);
    } catch (error) {
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
        res.status(500).json({ message: 'Error updating task status', error });
    }
};

// Update general deal information (name, summary, bio, etc.)
export const updateDeal = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Find the deal by ID and update with the new values
        const updatedDeal = await Deal.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedDeal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.status(200).json(updatedDeal);
    } catch (error) {
        res.status(500).json({ message: 'Error updating deal', error });
    }
};

