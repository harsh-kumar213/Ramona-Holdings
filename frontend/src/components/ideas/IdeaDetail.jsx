import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import Ideaform from './Ideaform.jsx';

const IdeaDetail = () => {
  const { id } = useParams(); 
  const [idea, setIdea] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [suggestedBy, setSuggestedBy] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [status, setStatus] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchIdea();
  }, [id]);

  const fetchIdea = async () => {
    try {
      const response = await axios.get(`/api/ideas/${id}`);
      setIdea(response.data);
    } catch (error) {
      console.error('Error fetching idea:', error);
    }
  };

  const handleAddSuggestion = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post(`/api/ideas/suggestions/${id}`, { suggestedBy, suggestionText, status });
      fetchIdea(); 
      setSuggestedBy('');
      setSuggestionText('');
      setStatus('');
    } catch (error) {
      console.error('Failed to add suggestion:', error);
    }
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  const handleEdit = () => {
    setIsFormOpen(true); 
  };

  const handleUpdate = async (formData) => {
    try {
      await axios.patch(`/api/ideas/${id}`, formData); 
      fetchIdea(); 
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to save idea:', error);
    }
  };

  if (!idea) {
    return <div>Loading...</div>;
  }

  const imageFilename = idea.image ? idea.image.split('\\').pop().split('/').pop() : null;
  const imageUrl = imageFilename ? `http://localhost:5000/uploads/${imageFilename}` : null;

  return (
    <div className="flex mt-5 justify-center items-center h-screen bg-gray-100">
      <div className="card w-full lg:w-1/2 bg-white text-black shadow-xl">
        {idea.image && (
          <figure>
            <img src={imageUrl} alt={idea.title} className="w-3/4 h-1/3 object-cover" />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">Title: {idea.title}</h2>
          <p className=" mt-4">{idea.content}</p>

          
          <div className="flex justify-between mt-6">
            <button className="btn btn-secondary" onClick={toggleSuggestions}>
              {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
            </button>
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
          </div>
          

          {showSuggestions && (
            <div className="mt-4">
              <div className="my-4">
                <h3 className="font-bold">Suggestions</h3>
                {idea.suggestions.length > 0 ? (
                  idea.suggestions.map((suggestion, index) => (
                    <div key={index} className="p-2 bg-gray-200 my-2 rounded-md">
                      <p className="text-sm">
                        <strong>{suggestion.suggestedBy}:</strong> {suggestion.suggestionText}
                      </p>
                      <p className="text-xs text-gray-500">Status: {suggestion.status}</p>
                    </div>
                  ))
                ) : (
                  <p>No suggestions yet</p>
                )}
              </div>

              <form onSubmit={handleAddSuggestion}>
                <input
                  type="text"
                  className="input input-bordered w-full mb-2"
                  placeholder="Suggested By"
                  value={suggestedBy}
                  onChange={(e) => setSuggestedBy(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input input-bordered w-full mb-2"
                  placeholder="Add a suggestion"
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input input-bordered w-full mb-2"
                  placeholder="Status (pending, accepted, rejected)"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
                <button className="btn btn-primary mt-2" type="submit">
                  Submit Suggestion
                </button>
              </form>
            </div>
          )}

          

          <div className="mt-4 flex justify-center">
            <Link to="/ideas">
              <button className="btn btn-outline-secondary">
                ← Back to Listing
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <Ideaform
          existingIdea={idea}
          onSubmit={handleUpdate}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default IdeaDetail;
