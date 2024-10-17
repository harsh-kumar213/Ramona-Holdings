import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import Business from './Business.jsx';
import BusinessForm from './BusinessForm.jsx'
import { useParams } from 'react-router-dom';

const BusinessList = () => {
    const {id} = useParams();
    const [companies,setCompanies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const [isFormOpen,setIsFormOpen] = useState(false);
    
    useEffect(()=>{
      fetchCompanies();
    },[])
    const fetchCompanies =async()=>{
        try {
            const response = await axios.get(`/api/theses/companies/${id}`);
            console.log(response.data);
            setCompanies(response.data);
        } catch (error) {
            console.log("error in fetching the companies");
        }
    }
    const filteredCompanies =companies.filter((company)=>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(filteredCompanies)
    if(!companies)
        return  <div className='flex justify-center align-middle text-7xl'>Loading...</div>
    
    const handleCreate =async (formData)=>{
         try {
            for (const pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
             await axios.post('/api/company',formData);
            fetchCompanies();
            setIsFormOpen(false);
         } catch (error) {
            console.log("error in creating the company",error);
         }
    }

  return (
    <div className='m-0 bg-white p-1 container '>
        <div className='flex flex-row mt-5 justify-around'>
           <h2 className='font-semibold font-sans text-3xl text-purple-700'>Companies : </h2>
           <input type="search" placeholder='Company Name' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='input bg-white text-black input-bordered text-xl' />
           <button className='btn btn-circle' onClick={()=>setIsFormOpen(true)}><FaPlus className='h-6 w-6'/></button>
        </div>
        <div className='flex flex-row flex-wrap m-10 justify-normal mt-5'>
        {filteredCompanies.length>0?(
               filteredCompanies.map((company)=>(
                <Business key={company._id} company={company}/>
               ))
            ):(
                <p>No Company available</p>
            )}
        </div>
        {isFormOpen && 
              <BusinessForm
                existingDeal = {null}
                id ={id}
                onSubmit={handleCreate}
                onClose={()=>{setIsFormOpen(false)}}
              />
            }
    </div>
  )
}

export default BusinessList