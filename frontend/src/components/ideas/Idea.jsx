import React from 'react';
import { Link } from 'react-router-dom';

const IdeaCard = ({ idea }) => {
  // Extract the image filename
  const imageFilename = idea.image ? idea.image.split('\\').pop().split('/').pop() : null;
  const imageUrl = imageFilename ? `/uploads/${imageFilename}` : null;

  const trimmedContent = idea.content.length > 50 ? `${idea.content.substring(0, 50)}...` : idea.content;

  return (
    <div className="card lg:card-side text-black hover:scale-105 bg-white shadow-xl w-4/5 my-5 p-5">
      {/* Image on the top for small screens, on the left for large screens */}
      {imageUrl && (
        <figure className="w-full lg:w-1/2">
          <img src={imageUrl} alt={idea.title} className="w-full h-auto lg:h-full object-cover" />
        </figure>
      )}

      {/* Title and content */}
      <div className="card-body lg:w-2/3">
        <h2 className="card-title">{idea.title}</h2>
        <p>{trimmedContent}</p>

        <div className="card-actions justify-end">
          {/* Link to the detailed view */}
          <Link to={`/ideas/${idea._id}`}>
            <button className="btn btn-black text-white">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
