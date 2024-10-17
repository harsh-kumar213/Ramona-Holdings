import React, { useEffect,useState } from 'react';
import {FaPlus} from 'react-icons/fa'
import axios from 'axios';

import Contact from './Contact.jsx';
import ContactForm from './ContactForm.jsx';

const ContactList = () => {
    const [contacts,setContacts] = useState([]);
    const [isFormOpen,setIsFormOpen] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');

    useEffect(()=>{
        fetchContacts();
    },[]);
    const fetchContacts = async()=>{
        try {
            const response = await axios.get('/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.log("error in fetching the contacts",error);
        }
    }
    const filteredContacts = contacts.filter((contact)=>
       contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    console.log(filteredContacts)
    const handleCreate=async (formData)=>{
        try {
            const response = await axios.post('/api/contacts',formData);
            setContacts([response.data,...contacts]);
            setIsFormOpen(false);
        } catch (error) {
            console.log("error in creating the contact",error);
        }
    }

  return (
    <div className='container bg-white  w-full h-full mx-auto'>
  <div className='w-full flex flex-col'>
    <div className="flex flex-row  p-5 justify-between items-center">
      <h1 className='text-5xl font-bold font-sans text-primary'>Contacts:</h1>
      <div className="flex flex-row mr-10 justify-around items-center">
        <input 
          type="search" 
          placeholder='Search Name:' 
          className='input bg-white text-black input-bordered' 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className='btn btn-circle ml-5' onClick={()=>setIsFormOpen(true)}><FaPlus className='h-6 w-6'/></button>
      </div>
    </div>
    <hr className='border-2' />
    {/* Card Wrapper */}
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4'>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
            <Contact key={contact._id} contact={contact} />
        ))
      ) : (
        <p>No Contacts Available</p>
      )}
    </div>

    {/* Contact Form */}
    {isFormOpen && 
      <ContactForm
        existingContact={null}
        onSubmit={handleCreate}
        onClose={() => setIsFormOpen(false)}
      />
    }
  </div>
</div>

  )
}

export default ContactList