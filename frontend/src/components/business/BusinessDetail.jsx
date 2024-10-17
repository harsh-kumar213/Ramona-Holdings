import React, { useState, useEffect } from 'react';
import { FaArrowDown,FaCheckCircle, FaCircle,FaPlus } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Typography, Button } from '@mui/material';
import BusinessForm from './BusinessForm.jsx';
import 'chart.js/auto';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusinessDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null); 
  const [update,setUpdate] = useState();
  const [pushUpdate,setPushUpdate] = useState(false);
  const [pushFinancial,setPushFinancial] = useState(false);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [isFormOpen,setIsFormOpen] = useState(false);
  const [financials, setFinancials] = useState({ revenue: '', expenses: '', profit: '' });
  const navigate = useNavigate(); 
  
  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`/api/company/${id}`);
      setCompany(response.data);
    } catch (error) {
      console.log('Error fetching the company:', error);
    }
  };

  const handleUpdate = async(formData)=>{
    try {
        const response = await axios.patch(`/api/company/${id}`,formData);
        // setCompany([response.data]);
        fetchCompany();
        setIsFormOpen(false);
    } catch (error) {
        console.log("error in updating the company",error)
    }
  }

  const addUpdate = async()=>{
    try {
        console.log(update)
        await axios.patch(`/api/company/updates/${id}`,{update});
        fetchCompany();
        setPushUpdate(false);
    } catch (error) {
       console.log("error in pushing the updates",error);
    }
  }
  
  const handleFinancialChange = (event) => {
    const { name, value } = event.target;
    setFinancials((prev) => ({ ...prev, [name]: value }));
};

  const addFinancial = async()=>{
    try {
       console.log(financials)
       await axios.patch(`/api/company/financials/${id}`,{financials})
       fetchCompany();
       setPushFinancial(false);
    } catch (error) {
      console.log("error in updating the financials",error);
    }
  }

  const handleToggleUpdates = () => setShowAllUpdates(!showAllUpdates);

  const createFinancialData = (label, data, borderColor) => ({
    labels: company.financials.map(f => new Date(f.date).toLocaleDateString()),
    datasets: [
      {
        label,
        data,
        borderColor,
        fill: false,
      },
    ],
  });

  const financialOptions = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Amount' } },
    },
  };

  if (!company) {
    return <div className="flex justify-center align-middle text-7xl">Loading...</div>; // Loading state
  }
  console.log(company)

  const updatesToShow = company && showAllUpdates ? [...company.updates].reverse() : company?.updates?.slice(-3).reverse();
  const companyFilename = company.image ? company.image.split('\\').pop().split('/').pop() : null;
  const imageUrl = companyFilename ? `http://localhost:5000/uploads/${companyFilename}` : null;

  return (
    <div className="w-full p-6 bg-gray-100">
     
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
          <div className="w-64 h-64 bg-gray-300 rounded-lg overflow-hidden mr-6">
            <img src={imageUrl} alt={company.name} className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold">{company.name}</h1>
            <p className="text-xl text-gray-600 mt-4">Thesis: {company.thesis.title}</p>
            {company.country && <p className="text-xl text-gray-600 mt-4">Country: {company.country}</p>}
          </div>
        </div>
      </div>
      <hr />
      {/* Business Model */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Business Model</h2>
        <p className="text-lg text-gray-700">{company.businessModel}</p>
      </div>
      <hr />
      {/* Roadmap */}
      <div className="mb-6">
        <h3 className="font-bold text-2xl ">Roadmap:</h3>
        <Timeline position="alternate">
          {company.roadmap && company.roadmap.length > 0 ? (
            company.roadmap.map((phase, phaseIndex) => (
              <TimelineItem key={phase._id}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                  <Typography variant="body2" color="text.secondary">
                    {`Phase ${phaseIndex + 1}: `}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {phaseIndex < company.roadmap.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Typography variant="h6" component="span">
                    {phase.name}
                  </Typography>
                  {phase.tasks && phase.tasks.length > 0 && (
                    <ul>
                      {phase.tasks.map((task) => (
                        <li key={task._id} className="flex items-center space-x-2">
                          <Button
                          >
                            {task.completed ? (
                              <FaCheckCircle className="text-green-500" />
                            ) : (
                              <FaCircle className="text-gray-400" />
                            )}
                          </Button>
                          <span>{task.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))
          ) : (
            <Typography>No roadmap available.</Typography>
          )}
        </Timeline>
      </div>
      <hr />

      {/* Team Members */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <ul className="list-disc list-inside">
          {company.team?.map(member => (
            <li key={member._id}>
              <a href={`/contacts/${member._id}`} className="text-blue-500 underline">
                {member.fullName} - {member.occupation}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      {/* Deal Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Deal Involvement</h2>
        <p className="text-lg text-gray-700">{company.deal.involvement}</p>
      </div>
       <hr />
      {/* Financials Graph */}
      <div className="mb-8">
      <div className='flex flex-row m-2 justify-between'>
      <h2 className="text-2xl font-bold ">Financials :</h2>
        <button className='btn btn-circle ' onClick={()=>setPushFinancial(true)}><FaPlus className='h-6 w-6 rounded'></FaPlus></button>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center mx-auto w-full max-w-6xl">
          <div className="w-full md:w-1/3">
            <h3 className="text-center font-bold mb-2">Revenue</h3>
            <Line 
              data={createFinancialData(
                'Revenue',
                company.financials.map(f => f.revenue),
                'rgba(75, 192, 192, 1)'
              )}
              options={financialOptions}
            />
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-center font-bold mb-2">Expenses</h3>
            <Line 
              data={createFinancialData(
                'Expenses',
                company.financials.map(f => f.expenses),
                'rgba(255, 99, 132, 1)'
              )}
              options={financialOptions}
            />
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-center font-bold mb-2">Profit</h3>
            <Line 
              data={createFinancialData(
                'Profit',
                company.financials.map(f => f.profit),
                'rgba(54, 162, 235, 1)'
              )}
              options={financialOptions}
            />
          </div>
        </div>
      </div>
      <hr />
      {/* Recent Updates */}
      <div className="mb-8   ">
        <div className='flex flex-row m-2 justify-between'>
        <h2 className="text-2xl font-bold">Recent Updates :</h2>
        <button className='btn btn-circle ' onClick={()=>setPushUpdate(true)}><FaPlus className='h-6 w-6 rounded'></FaPlus></button>
        </div>
        <ul className="list-disc list-inside">
          {updatesToShow.map((update, idx) => (
            <li key={idx} className="text-gray-600">{update}</li>
          ))}
        </ul>
        {company.updates.length > 3 && (
          <button 
            onClick={handleToggleUpdates} 
            className="mt-4 flex items-center text-blue-500"
          >
            {showAllUpdates ? 'Show Less' : 'Show All'} <FaArrowDown className="ml-2" />
          </button>
        )}
      </div>
      <hr />

      
      <div className="flex justify-evenly mt-8">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg mr-4 hover:bg-blue-700"
          onClick={()=>setIsFormOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
          onClick={() => navigate(`/theses/companies/${company?.thesis._id}`)}
        >
          Back to Listing
        </button>
      </div>
      {isFormOpen && 
              <BusinessForm
                existingCompany = {company}
                id ={company?.thesis._id}
                onSubmit={handleUpdate}
                onClose={()=>{setIsFormOpen(false)}}
              />
            }
          {pushUpdate && <div className="modal modal-open">
            <div className="modal-box bg-white text-black">
                <form onSubmit={addUpdate} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-gray-700">Update :</label>
                        <input
                            type="text"
                            value={update}
                            onChange={(e) => setUpdate(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded"
                        />
                    </div>
                   
                  <div className="flex justify-between mt-4">
                        <button type="button" className="btn btn-ghost" onClick={()=>setPushUpdate(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                    </form>
                    </div>
                </div>          
          }
          {pushFinancial && <div className="modal modal-open">
            <div className="modal-box bg-white text-black">
                <form onSubmit={addFinancial} className="space-y-4 mt-4">
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
                   
                  <div className="flex justify-between mt-4">
                        <button type="button" className="btn btn-ghost" onClick={()=>setPushFinancial(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                    </form>
                    </div>
                </div>          
          }
    </div>
  );
};

export default BusinessDetail;
