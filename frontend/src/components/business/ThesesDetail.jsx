import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaEdit,FaArrowLeft } from 'react-icons/fa';
import ThesesForm from './ThesesForm';
import axios from 'axios';

const ThesesDetail = () => {
    const {id} = useParams();
    console.log(id)
    const [thesis,setThesis] = useState(null);
    const [isFormOpen,setIsFormOpen] = useState(false);

    useEffect(()=>{
        fetchThesis();
    },[id]);
    
    const fetchThesis= async ()=>{
       try {
        const response  = await axios.get(`/api/theses/${id}`);
        console.log(response.data);
        setThesis(response.data);
       } catch (error) {
           console.log("error in fetching the thesis");
       }
    }
    const handleUpdate = async (formData)=>{
        try {
            await axios.patch(`/api/theses/${id}`,formData);
            fetchThesis();
            setIsFormOpen(false);
        } catch (error) {
            console.log("error in updating the theis");
        }
        
    }
    const navigate = useNavigate();
    const onBackToList =()=>{
        navigate('/theses');
    }
    if(!thesis)
        return <div className='flex justify-center align-middle text-7xl'>Loading...</div>
  return (
    <div className="min-h-screen bg-background flex flex-col">
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-evenly items-center">
        <button variant="ghost" onClick={onBackToList} className="text-muted-foreground">
          <FaArrowLeft className="mr-2 h-6 w-6" />
        Back To List
        </button>
        <button onClick={()=>setIsFormOpen(true)}>
          <FaEdit className="mr-2 h-6 w-6" />
          Edit
        </button>
      </div>
    </header>
    <main className="flex-grow container mx-auto px-4 py-8">
      <center><h1 className="text-4xl text-purple-500 font-bold mx-auto mb-6">{thesis.title}</h1></center>
      <div className="prose prose-muted max-w-none">
        <p className="text-xl text-white">{thesis.description}</p>
      </div>
    </main>
    {isFormOpen && 
      <ThesesForm
        existingThesis={thesis}
        onSubmit={handleUpdate}
        onclose ={()=>setIsFormOpen(false)}      
       />
    }
  </div>
  )
}

export default ThesesDetail