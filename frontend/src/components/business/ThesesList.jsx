import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {FaPlus} from 'react-icons/fa';
import Theses from './Theses.jsx';
import ThesesForm from './ThesesForm.jsx';

const ThesesList = () => {
    const [theses,setTheses] = useState([]);
    const [isFormOpen , setIsFormOpen] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');

    useEffect(()=>{
     fetchTheses();
    },[])
   
    const fetchTheses = async()=>{
        try {
            const response = await axios.get('/api/theses');
            const data = response.data;
            setTheses(data);
            console.log(data);
        } catch (error) {
            console.log("Error in fetching the theses");
        }
    }
    const filteredTheses = theses.filter((thesis) =>
        thesis.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    
    const handleCreate = async(formData)=>{
        try {
            console.log(formData.title);
            const response = await axios.post('/api/theses',formData);
            setTheses([response.data,...theses]);
            setIsFormOpen(false);
        } catch (error) {
            console.log("error creating the thesis")
        }
    }

  return (
    <div className='m-0 p-1 h-full bg-white container '>
        <center><h1 className='font-medium text-5xl mb-5  text-purple-700'>Ramona Holdings</h1></center><hr />
        <div className='flex flex-row mt-5 justify-between items-center p-2'>
           <h2 className='font-semibold font-sans text-3xl text-purple-700'>Thesises : </h2>
           <div className='flex flex-row justify-around items-center'>
           <input type="search" placeholder='Thesis Name' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='input bg-white text-black mr-2 input-bordered text-xl' />
           <button className='btn btn-circle' onClick={()=>setIsFormOpen(true)}><FaPlus className='h-6 w-6'/></button>
           </div>
        </div>
        <div className='flex flex-row flex-wrap m-10 justify-between mt-5'>
        {filteredTheses.length>0?(
               filteredTheses.map((thesis)=>(
                <Theses key={thesis._id} thesis={thesis}/>
               ))
            ):(
                <p>No Theses available</p>
            )}
        </div>
        {isFormOpen && 
              <ThesesForm
                existingDeal = {null}
                onSubmit={handleCreate}
                onClose={()=>{setIsFormOpen(false)}}
              />
            }
    </div>
  )
}

export default ThesesList