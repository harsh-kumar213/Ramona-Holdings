import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessForm = ({ existingCompany,id, onSubmit, onClose }) => {
    console.log(id,existingCompany,'after submit')
    const [companyName, setCompanyName] = useState('');
    const [businessModel, setBusinessModel] = useState('');
    const [coreValues, setCoreValues] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [availableContacts, setAvailableContacts] = useState([]);
    const [deal, setDeal] = useState('');
    const [country,setCountry] = useState('');
    // New states for financials, roadmap, and image
    const [financials, setFinancials] = useState({ revenue: '', expenses: '', profit: '' });
    const [roadmapPhases, setRoadmapPhases] = useState([]);
    const [image, setImage] = useState(null); // State for image file

    useEffect(() => {
        fetchContacts();
        if (existingCompany) {
            setCompanyName(existingCompany.name);
            setBusinessModel(existingCompany.businessModel);
            setCoreValues(existingCompany.coreValues);
            setTeamMembers(existingCompany.team);
            setDeal(existingCompany.deal || '');
            setFinancials(existingCompany.financials || { revenue: '', expenses: '', profit: '' });
            setRoadmapPhases(existingCompany.roadmap || []);
            
            setImage(null);
        }
    }, [existingCompany]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('/api/contacts'); // Update with your endpoint
            setAvailableContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleTeamMemberChange = (event) => {
        const { options } = event.target;
        const selectedMembers = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedMembers.push(options[i].value);
            }
        }
        setTeamMembers(selectedMembers);
    };

    const handleFinancialChange = (event) => {
        const { name, value } = event.target;
        setFinancials((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhaseChange = (phaseIndex, field, value) => {
        const updatedPhases = [...roadmapPhases];
        updatedPhases[phaseIndex][field] = value;
        setRoadmapPhases(updatedPhases);
    };
    
    const handleTaskChange = (phaseIndex, taskIndex, field, value) => {
        const updatedPhases = [...roadmapPhases];
        updatedPhases[phaseIndex].tasks[taskIndex][field] = value;
        setRoadmapPhases(updatedPhases);
    };
    
    const addTask = (phaseIndex) => {
        const updatedPhases = [...roadmapPhases];
        updatedPhases[phaseIndex].tasks.push({ description: '', completed: false }); 
        setRoadmapPhases(updatedPhases);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('name', companyName);
        formData.append('businessModel', businessModel);
        formData.append('coreValues', coreValues);
        formData.append('country',country);
        if(!existingCompany){
        formData.append('thesisId',id);
        formData.append('team', teamMembers); 
        formData.append('financials[revenue]', Number(financials.revenue));
        formData.append('financials[expenses]', Number(financials.expenses));
        formData.append('financials[profit]', Number(financials.profit)); 
        formData.append('deal[involvement]', deal);}
        roadmapPhases.forEach((phase, phaseIndex) => {
            formData.append(`roadmap[${phaseIndex}][phase]`, phase.phase);
            phase.tasks.forEach((task, taskIndex) => {
                formData.append(`roadmap[${phaseIndex}][tasks][${taskIndex}][description]`, task.description);
                formData.append(`roadmap[${phaseIndex}][tasks][${taskIndex}][completed]`, task.completed);
            });
        });
    
        if (!existingCompany) {
            formData.append('image', image); 
        }
    
        
        onSubmit(formData);
    };
    

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-white text-black">
                <h2 className="text-2xl font-light">{existingCompany ? 'Edit Company' : 'Create Company'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Company Information */}
                    <div>
                        <label className="block text-gray-700">Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Business Model</label>
                        <input
                            type="text"
                            value={businessModel}
                            onChange={(e) => setBusinessModel(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Core Values</label>
                        <textarea
                            value={coreValues}
                            onChange={(e) => setCoreValues(e.target.value)}
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Country </label>
                        <textarea
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    </div>

                   {!existingCompany && <div>
                        <label className="block text-gray-700">Deal</label>
                        <select
                            value={deal}
                            onChange={(e) => setDeal(e.target.value)}
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Deal Type</option>
                            <option value="partner">Partner</option>
                            <option value="investor">Investor</option>
                        </select>
                    </div>}
                    {/* Team Members Selection */}
                    {!existingCompany && <div>
                        <label className="block text-gray-700">Select Team Members</label>
                        <select
                            multiple
                            value={teamMembers}
                            onChange={handleTeamMemberChange}
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        >
                            {availableContacts.map((contact) => (
                                <option key={contact._id} value={contact._id}>
                                    {contact.fullName} - {contact.occupation}
                                </option>
                            ))}
                        </select>
                    </div>}

                    {/* Financial Data Input */}
                    {!existingCompany && <div>
                        <h3 className="font-semibold text-lg">Financial Data</h3>
                        <div>
                            <label className="block text-gray-700">Revenue</label>
                            <input
                                type="number"
                                name="revenue"
                                value={financials.revenue}
                                onChange={handleFinancialChange}
                                className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Expenses</label>
                            <input
                                type="number"
                                name="expenses"
                                value={financials.expenses}
                                onChange={handleFinancialChange}
                                className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Profit</label>
                            <input
                                type="number"
                                name="profit"
                                value={financials.profit}
                                onChange={handleFinancialChange}
                                className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        </div>
                    </div>}

                    {/* Image Upload Input - Only shown when creating */}
                    {!existingCompany && (
                        <div>
                            <label className="block text-gray-700">Upload Company Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                            />
                        </div>
                    )}

                    {/* Roadmap Input */}
                    <div>
                        <h3 className="font-semibold text-lg">Roadmap</h3>
                        {roadmapPhases.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="border p-4 mb-4 rounded">
                                <div className="mb-2">
                                    <label className="block text-gray-700">Phase</label>
                                    <input
                                        type="text"
                                        value={phase.phase}
                                        onChange={(e) => handlePhaseChange(phaseIndex, 'phase', e.target.value)}
                                        className="input bg-white text-black input-bordered w-full" // Adjusted text color to black
                                        required
                                    />
                                </div>

                                {/* Tasks */}
                                <h4 className="text-lg mb-1">Tasks</h4>
                                {phase.tasks.map((task, taskIndex) => (
                                    <div key={taskIndex} className="mb-2">
                                        <input
                                            type="text"
                                            value={task.description}
                                            onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'description', e.target.value)}
                                            className="input bg-white text-black input-bordered w-full mb-1" // Adjusted text color to black
                                            placeholder="Add task"
                                            required
                                        />
                                        <label className="cursor-pointer label">
                                            <span className="label-text">Completed</span>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'completed', e.target.checked)}
                                                className="checkbox checkbox-primary"
                                            />
                                        </label>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary" onClick={() => addTask(phaseIndex)}>
                                    Add Task
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={() => setRoadmapPhases([...roadmapPhases, { phase: '', tasks: [] }])}>
                            Add Phase
                        </button>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {existingCompany ? 'Update Company' : 'Create Company'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessForm;
