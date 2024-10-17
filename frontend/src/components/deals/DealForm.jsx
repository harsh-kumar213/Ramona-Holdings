import React, { useState, useEffect } from 'react';

const DealForm = ({ existingDeal, onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [stakeholders, setStakeholders] = useState([{ name: '', role: '', bringsToTable: [''], takesFromTable: [''] }]);
    const [phases, setPhases] = useState([{ phase: '', tasks: [{ description: '', completed: false }] }]);
    const [financials, setFinancials] = useState(0);
    const [image, setImage] = useState(null);
    const [country,setCountry] = useState('');

    useEffect(() => {
        if (existingDeal) {
            setTitle(existingDeal.title);
            setSummary(existingDeal.summary);
            setStakeholders(existingDeal.stakeholders.map(stakeholder => ({
                name: stakeholder.name,
                role: stakeholder.role,
                bringsToTable: stakeholder.bringsToTable?.length > 0 ? stakeholder.bringsToTable : [''],
                takesFromTable: stakeholder.takesFromTable?.length > 0 ? stakeholder.takesFromTable : ['']
            })));
            setPhases(existingDeal.roadmap || []);
            setFinancials(existingDeal.financials || 0);
        }
    }, [existingDeal]);

    // Stakeholder Handlers
    const handleStakeholderChange = (index, field, value) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[index][field] = value;
        setStakeholders(newStakeholders);
    };

    const addStakeholder = () => {
        setStakeholders([...stakeholders, { name: '', role: '', bringsToTable: [''], takesFromTable: [''] }]);
    };

    const handleBringsToTableChange = (stakeholderIndex, value, subIndex) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[stakeholderIndex].bringsToTable[subIndex] = value;
        setStakeholders(newStakeholders);
    };

    const addBringsToTable = (stakeholderIndex) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[stakeholderIndex].bringsToTable.push('');
        setStakeholders(newStakeholders);
    };

    const handleTakesFromTableChange = (stakeholderIndex, value, subIndex) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[stakeholderIndex].takesFromTable[subIndex] = value;
        setStakeholders(newStakeholders);
    };

    const addTakesFromTable = (stakeholderIndex) => {
        const newStakeholders = [...stakeholders];
        newStakeholders[stakeholderIndex].takesFromTable.push('');
        setStakeholders(newStakeholders);
    };

    // Phase and Task Handlers
    const handlePhaseChange = (phaseIndex, field, value) => {
        const newPhases = [...phases];
        newPhases[phaseIndex][field] = value;
        setPhases(newPhases);
    };

    const handleTaskChange = (phaseIndex, taskIndex, field, value) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].tasks[taskIndex][field] = value;
        setPhases(newPhases);
    };

    const addPhase = () => {
        setPhases([...phases, { phase: '', tasks: [{ description: '', completed: false }] }]);
    };

    const addTask = (phaseIndex) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].tasks.push({ description: '', completed: false });
        setPhases(newPhases);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(title, summary, stakeholders, phases, financials); 

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('country',country);
        stakeholders.forEach((stakeholder, index) => {
            formData.append(`stakeholders[${index}][name]`, stakeholder.name);
            formData.append(`stakeholders[${index}][role]`, stakeholder.role);
            stakeholder.bringsToTable.forEach((item, i) => {
                formData.append(`stakeholders[${index}][bringsToTable][${i}]`, item);
            });
            stakeholder.takesFromTable.forEach((item, i) => {
                formData.append(`stakeholders[${index}][takesFromTable][${i}]`, item);
            });
        });

        phases.forEach((phase, phaseIndex) => {
            formData.append(`roadmap[${phaseIndex}][phase]`, phase.phase);
            phase.tasks.forEach((task, taskIndex) => {
                formData.append(`roadmap[${phaseIndex}][tasks][${taskIndex}][description]`, task.description);
                formData.append(`roadmap[${phaseIndex}][tasks][${taskIndex}][completed]`, task.completed);
            });
        });

        formData.append('financials', Number(financials)); 

        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-5xl bg-white text-black p-6">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4">{existingDeal ? 'Edit Deal' : 'Create Deal'}</h2>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="input text-white input-bordered w-full"
                            required 
                        />
                    </div>

                    {/* Summary */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Summary</label>
                        <textarea 
                            value={summary} 
                            onChange={(e) => setSummary(e.target.value)} 
                            className="textarea text-white textarea-bordered w-full"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Country</label>
                        <textarea 
                            value={country} 
                            onChange={(e) => setCountry(e.target.value)} 
                            className="textarea text-white textarea-bordered w-full"
                            required 
                        />
                    </div>

                    {/* Stakeholders */}
                    <h3 className="text-xl mb-2">Stakeholders</h3>
                    {stakeholders.map((stakeholder, index) => (
                        <div key={index} className="border p-4 mb-4 rounded">
                            <div className="mb-2">
                                <label className="block text-gray-700">Name</label>
                                <input 
                                    type="text" 
                                    value={stakeholder.name} 
                                    onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)} 
                                    className="input text-white input-bordered w-full"
                                    required 
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Role</label>
                                <input 
                                    type="text" 
                                    value={stakeholder.role} 
                                    onChange={(e) => handleStakeholderChange(index, 'role', e.target.value)} 
                                    className="input text-white input-bordered w-full"
                                    required 
                                />
                            </div>

                            {/* Brings to Table */}
                            <h4 className="text-lg mb-1">Brings to Table</h4>
                            {stakeholder.bringsToTable.map((item, subIndex) => (
                                <div key={subIndex} className="mb-2">
                                    <input 
                                        type="text" 
                                        value={item} 
                                        onChange={(e) => handleBringsToTableChange(index, e.target.value, subIndex)} 
                                        className="input text-white input-bordered w-full mb-1"
                                        placeholder="Add item"
                                    />
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary" onClick={() => addBringsToTable(index)}>Add</button>

                            {/* Takes from Table */}
                            <h4 className="text-lg mb-1">Takes from Table</h4>
                            {stakeholder.takesFromTable.map((item, subIndex) => (
                                <div key={subIndex} className="mb-2">
                                    <input 
                                        type="text" 
                                        value={item} 
                                        onChange={(e) => handleTakesFromTableChange(index, e.target.value, subIndex)} 
                                        className="input text-white input-bordered w-full mb-1"
                                        placeholder="Add item"
                                    />
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary" onClick={() => addTakesFromTable(index)}>Add</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mb-4" onClick={addStakeholder}>Add Stakeholder</button>

                    {/* Roadmap */}
                    <h3 className="text-xl mb-2">Roadmap</h3>
                    {phases.map((phase, phaseIndex) => (
                        <div key={phaseIndex} className="border p-4 mb-4 rounded">
                            <div className="mb-2">
                                <label className="block text-gray-700">Phase</label>
                                <input 
                                    type="text" 
                                    value={phase.phase} 
                                    onChange={(e) => handlePhaseChange(phaseIndex, 'phase', e.target.value)} 
                                    className="input text-white input-bordered w-full"
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
                                        className="input text-white input-bordered w-full mb-1"
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
                            <button type="button" className="btn btn-secondary" onClick={() => addTask(phaseIndex)}>Add Task</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mb-4" onClick={addPhase}>Add Phase</button>

                    {/* Financials */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Financials</label>
                        <input 
                            type="number" 
                            value={financials} 
                            onChange={(e) => setFinancials(e.target.value)} 
                            className="input text-white input-bordered w-full"
                            required 
                        />
                    </div>

                    {/* Image Upload */}
                    {!existingDeal && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input 
                                type="file" 
                                onChange={(e) => setImage(e.target.files[0])} 
                                className="input text-white input-bordered w-full"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-full">Submit</button>
                </form>
                <button className="btn btn-outline mt-4" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DealForm;
