import React from 'react';
import { useNavigate } from 'react-router-dom';

const Business = ({company}) => {
    const { name, coreValues, updates } = company;
    const recentUpdate = updates.length ? updates[updates.length - 1] : 'No updates yet';
    const companyFilename = company.image ? company.image.split('\\').pop().split('/').pop() : null;
    const imageUrl = companyFilename ? `/uploads/${companyFilename}` : null;

    const navigate = useNavigate();
    const companyDetail =()=>{
        navigate(`/company/${company._id}`);
    }

  return (
    <div className="bg-white text-black mb-7 w-64 h-96 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 mx-auto">
    
      <div className="h-1/2 bg-gray-800 cursor-pointer" onClick={companyDetail}>
        <img
          src={imageUrl}
          alt={`${name} logo`}
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="p-4 flex flex-col justify-between h-1/2">
        <div>
          <h2 className="text-2xl font-bold mb-1 truncate">{name}</h2>
          <p className="text-gray-400 mb-2 truncate">Core Values: {coreValues}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Recent Update:</p>
          <p className="text-sm italic truncate">{recentUpdate}</p>
        </div>
      </div>
    </div>
  )
}

export default Business