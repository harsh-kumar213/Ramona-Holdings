import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import DealForm from './DealForm.jsx';

const DealDetail = () => {
  const { id } = useParams(); // Destructure to get the id from route params
  const [deal, setDeal] = useState(null); // Initialize deal as null
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    fetchDeal();
  }, [id]);

  const fetchDeal = async () => {
    try {
      const response = await axios.get(`/api/deals/${id}`);
      console.log(response.data); // Check the structure of the response
      setDeal(response.data); 
      
    } catch (error) {
      console.error('Error in fetching the deal', error);
    }
  };

  const handleEdit = () => {
    setIsFormOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      await axios.patch(`/api/deals/${id}`, formData); 
      fetchDeal(); 
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to update deal:', error);
    }
  };

  const handleTaskCompletion = async (phaseId, taskId, isCompleted) => {
    try {
      const response = await axios.patch(`/api/deals/roadmap/task/${id}`, {
        phaseId,
        taskId,
        completed: !isCompleted,
      });
      setDeal(response.data); 
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (!deal) {
    return <div>Loading...</div>; 
  }

  const dealFilename = deal.image ? deal.image.split('\\').pop().split('/').pop() : null;
  const imageUrl = dealFilename ? `http://localhost:5000/uploads/${dealFilename}` : null;

  return (
    <div className="container mx-auto bg-white p-6">
      <div className="flex items-center mb-6">
        <img src={imageUrl} alt={deal.title} className="w-20 h-20 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{deal.title}</h2>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-lg text-primary">Deal Summary:</h3>
        <p>{deal.summary}</p>
      </div>
     {deal.country &&  <div className="mb-6">
        <h3 className="font-bold text-lg text-primary">Deal Country:</h3>
        <p>{deal.country}</p>
      </div>}
      
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8"> Roadmap :</h1>
      {deal.roadmap && deal.roadmap.length > 0 ? (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2"></div>
          
          {deal.roadmap.map((phase, phaseIndex) => (
            <div key={phase._id} className={`flex ${phaseIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-8`}>
              <div className="w-1/2"></div>
              <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <div className="w-1/2 px-4">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      Phase {phaseIndex + 1}: {phase.name}
                    </h2>
                    {phase.tasks && phase.tasks.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {phase.tasks.map((task) => (
                          <li key={task._id} className="flex items-center space-x-2">
                            <button className="btn btn-circle btn-xs">
                              {task.completed ? (
                                <FaCheckCircle className="text-success" />
                              ) : (
                                <FaCircle className="text-base-300" />
                              )}
                            </button>
                            <span>{task.description}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No roadmap available.</p>
      )}
    </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-lg text-primary">Stakeholders:</h3>
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Person</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">SH Type</th>
              <th className="border px-4 py-2">Brings to Table</th>
              <th className="border px-4 py-2">Takes from Table</th>
            </tr>
          </thead>
          <tbody>
  {deal.stakeholders && deal.stakeholders.length > 0 ? (
    deal.stakeholders.map((stakeholder) => (
      <tr key={stakeholder._id}>
        <td className="border px-4 py-2">{stakeholder.name}</td>
        <td className="border px-4 py-2">{stakeholder.role}</td>
        <td className="border px-4 py-2">{stakeholder.type}</td>
        <td className="border px-4 py-2">
          {stakeholder.bringsToTable && stakeholder.bringsToTable.length > 0 ? (
            <ul className="list-disc ml-4">
              {stakeholder.bringsToTable.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>No contributions listed.</span> // Fallback text if empty
          )}
        </td>
        <td className="border px-4 py-2">
          {stakeholder.takesFromTable && stakeholder.takesFromTable.length > 0 ? (
            <ul className="list-disc ml-4">
              {stakeholder.takesFromTable.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span>No items listed.</span> // Fallback text if empty
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="border px-4 py-2">No stakeholders available.</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-primary">Financials:</h3>
        <p>{deal.financials || 'No financial information available.'}</p>
      </div>

      <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit
        </button>
      </div>

      <div className="mt-4">
        <Link to="/deals">
          <button className="btn btn-sm btn-outline-secondary">
            ← Back to Listing
          </button>
        </Link>
      </div>

      {isFormOpen && (
        <DealForm
          existingDeal={deal}
          onSubmit={handleUpdate}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default DealDetail;
