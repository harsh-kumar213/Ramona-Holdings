import React from 'react';
import { useNavigate } from 'react-router-dom';


const Contact = ({contact}) => {
    
    const contactFilename = contact.image ? contact.image.split('\\').pop().split('/').pop() : null;
    const imageUrl = contactFilename ? `/uploads/${contactFilename}` : null;

    const navigate = useNavigate();

    const handleClick =()=>{
        navigate(`/contacts/${contact._id}`);
    }

  return (
    
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden mx-auto">
      <div className="flex flex-col md:flex-col justify-center items-center sm:w-40 sm:h-32 md:w-64 lg:w-72 lg:h-56 m-5 p-4">
        <div className="md:w-36 md:h-36 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex-shrink-0">
          <img
            src={imageUrl}
            alt="profile"
            className="rounded-full h-full w-full cursor-pointer object-cover"
            onClick={handleClick}
          />
        </div>
        <div className="ml-4 flex flex-col items-center md:items-start">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold text-gray-600 mr-1">
              {contact.fullName}
            </h2>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">| {contact.status}</span> | {contact.relationShipTracking?.karmaPoints ?? 0}
            </p>
          </div>
          <p className="text-lg text-gray-600 mt-1">
            {contact.affiliation ? contact.affiliation : 'No Affiliation'}
          </p>
        </div>
      </div>
    </div>

  )
}

export default Contact