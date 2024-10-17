import React from 'react';
import { Link } from 'react-router-dom';

const Deal = ({ deal }) => {
  const dealFilename = deal.image ? deal.image.split('\\').pop().split('/').pop() : null;
  const imageUrl = dealFilename ? `http://localhost:5000/uploads/${dealFilename}` : null;

  const trimmedContent = deal.summary.length > 100 ? `${deal.summary.substring(0, 100)}...` : deal.summary;

  return (
    <div className="card lg:card-side w-4/5 my-5 p-5  bg-white border-solid border-black hover:scale-105 drop-shadow-xl">
      {/* Image at the top on small screens, on the left on large screens */}
      <figure className="w-full lg:w-1/2">
        <img
          src={imageUrl}
          alt={deal.title}
          className="w-full h-auto lg:w-full lg:h-full object-cover"
        />
      </figure>

      {/* Card body for text content */}
      <div className="card-body lg:w-2/3">
        <h2 className="card-title">{deal.title}</h2>
        <p>{trimmedContent}</p>
        <div className="card-actions justify-end">
          <Link to={`/deals/${deal._id}`}>
            <button className="btn btn-black text-white">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Deal;
