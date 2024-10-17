import React,{useState,useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';
import axios from 'axios';
import DealForm from './DealForm.jsx';
import Deal from './Deal.jsx';

const DealList = () => {
    const [deals,setDeals] = useState([]);
    const [isFormOpen,setIsFormOpen] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');

    useEffect(()=>{
      fetchDeals();
    },[]);

    const fetchDeals = async()=>{
      try {
        const response = await axios.get('/api/deals');
        console.log(response)
        setDeals(response.data);
      } catch (error) {
          console.log("Error in fetching the deals");
      }
    }

    const filteredDeals = deals.filter((deal) =>
      deal.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCreate = async (formData) => {
      try {
        for (const pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
      }
            
        await axios.post(`/api/deals`, formData); 
        fetchDeals(); 
        setIsFormOpen(false);
      } catch (error) {
        console.error('Failed to create deal:', error);
      }
    };
    console.log(filteredDeals)

  return (
    <div className='container p-2 text-black bg-white'>
        
            <div className='flex p-3 justify-between px-5 items-center m-5 w-full mt-0'>
                <h1 className='text-primary font-bold text-5xl'>Deals : </h1>
                <div>
                <input type="search" placeholder='Deal Name' value={searchTerm} onChange={(e) =>{setSearchTerm(e.target.value)}} className='input bg-white border-black text-black input-bordered mr-4 text-xl' />
                <button className='btn btn-circle bg-black ' onClick={()=>{setIsFormOpen(true)}}><FaPlus className='h-6 w-6'/></button>
                </div>
            </div>
            <hr className='border-2'/>
            <div className='flex justify-center flex-col items-center'>
            {filteredDeals.length>0?(
               filteredDeals.map((deal)=>(
                <Deal key={deal._id} deal={deal}/>
               ))
            ):(
                <p>No Deals available</p>
            )}
            </div>
            {isFormOpen && 
              <DealForm
                existingDeal = {null}
                onSubmit={handleCreate}
                onClose={()=>{setIsFormOpen(false)}}
              />
            }
       

    </div>
  )
}

export default DealList;