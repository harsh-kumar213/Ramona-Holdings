import React, { useEffect, useState } from 'react';


import TodoList from './Todolist.jsx';
import axios from 'axios';
import Map from './Map.jsx';

const Home = () => {
   const [contacts,setContacts] = useState([]);
   const [deals,setDeals] = useState([]);
   const [companies,setCompanies] = useState([]);
   const [i, setI] = useState(1);
   
   
   
  const nextSlide=()=>{
      if(i==3)
        setI(1);
      else
        setI(i+1);
  }
  const prevSlide=()=>{
    if(i==0)
      setI(3);
    else
      setI(i-1);
  }
 


   useEffect(()=>{
      try {
        fetchContacts();
        fetchDeals();
        fetchCompanies();
      } catch (error) {
         console.log("error in fetching the deals,companies or contacts",error);
      }
   },[])
  
   const fetchCompanies=async()=>{
    try {
        const response = await axios.get('/api/company/map',{mode:'no-cors'});
        console.log(response.data);
        setCompanies(response.data);
    } catch (error) {
      console.log("error in fetching the companies for the map",error.response ? error.response.data : error.message);
    }
   }

   const fetchContacts =async()=>{
      try {
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
      } catch (error) {
          console.log("error in fetching the contacts",error);
      }
   }

   const fetchDeals = async()=>{
    try {
        const response = await axios.get('/api/deals');
        setDeals(response.data);
    } catch (error) {
      console.log("error in fetching the deals for map",error)
    } 
   }

  return (
    <div className="w-full flex flex-col justify-center items-center">
  <div className="relative w-full">
    <div className="carousel rounded-box w-full">
      <div id="slide1" className="carousel-item flex-col w-full">
        <Map values={contacts} mid="map1" /> 
        <p className='text-center text-white font-bold text-xl'>Contacts</p>
      </div>
      <div id="slide2" className="carousel-item flex-col w-full">
        <Map values={deals} mid="map2" /> 
        <p className='text-center text-white font-bold text-xl'>Deals</p>
      </div>
      <div id="slide3" className="carousel-item flex-col w-full">
        <Map values={companies} mid="map3" /> 
        <p className='text-center text-white font-bold text-xl'>Companies</p>
      </div>
    </div>

    {/* Navigation buttons */}
    <div className="absolute flex justify-between transform -translate-y-1/2 top-1/2 w-full px-4">
    <a href={`#slide${i}`} className="btn btn-circle" onClick={prevSlide}>❮</a>  {/* Previous button */}
    <a href={`#slide${i}`} className="btn btn-circle" onClick={nextSlide}>❯</a>  {/* Next button */}
  </div>

  
  </div>

  {/* Other component */}
  <TodoList />
</div>

  )
}

export default Home