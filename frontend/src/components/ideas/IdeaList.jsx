import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa'; 
import IdeaCard from './Idea.jsx';
import Ideaform from './Ideaform.jsx';
import axios from 'axios';

const IdeaList = () => {
  const [ideas, setIdeas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('/api/ideas');
      setIdeas(response.data);
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const response = await axios.post('/api/ideas', formData);
      setIdeas([response.data, ...ideas]); 
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to save idea:', error);
    }
  };

  
  const filteredIdeas = ideas.filter((idea) =>
    idea.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container bg-white  w-full mt-0">
      <div className="flex justify-between items-center p-1 my-4">
        <h1 className="text-5xl ml-3 text-primary font-bold">Ideas : </h1>

        <div className='mr-5'>
        <input
          type="text"
          placeholder="Search Ideas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input bg-white text-black border-black input-bordered mr-4"
        />

      
        <button
          className="btn btn-circle btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus className="h-6 w-6 " />
          
        </button>
        </div>
      </div>
      <hr className='border-2'/>
      <div className='flex justify-center flex-col items-center'>
      {filteredIdeas.length > 0 ? (
        filteredIdeas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))
      ) : (
        <p>No ideas available</p>
      )}
      </div>

     
      {isFormOpen && (
        <Ideaform
          existingIdea={null}
          onSubmit={handleCreate}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default IdeaList;
