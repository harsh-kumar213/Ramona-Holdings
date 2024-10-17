import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ContactForm from './ContactForm';

const ContactDetail = () => {
    const {id} = useParams();
    const [contact,setContact] = useState(null);
    const [isFormOpen,setIsFormOpen] = useState(false);

    useEffect(()=>{
       fetchContact();
    },[]);
    const fetchContact = async()=>{
        try {
            const response = await axios.get(`/api/contacts/${id}`);
            setContact(response.data);
        } catch (error) {
            console.log("error in fetching the contact",error);
        }
    }
    const handleUpdate = async (formData)=>{
        try {
            const response = await axios.patch(`/api/contacts/${id}`,formData);
            setContact(response.data);
            setIsFormOpen(false);
        } catch (error) {
            console.log("error in updating the contact",error);
        }
    }
   

    if (!contact) {
        return <div className="flex justify-center align-middle text-7xl">Loading...</div>; 
      }
      const contactFilename = contact.image ? contact.image.split('\\').pop().split('/').pop() : null;
      const imageUrl = contactFilename ? `http://localhost:5000/uploads/${contactFilename}` : null;
      const kappaData = {
        labels: contact.relationshipTracking.kappa.map((point) => new Date(point.time).toLocaleDateString()),
        datasets: [
          {
            label: 'Kappa Value',
            data: contact.relationshipTracking.kappa.map((point) => point.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          },
        ],
      };
    
      const kappaOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Kappa Value',
            },
          },
        },
      };
    
      return (
        <div className="bg-white w-full p-4 text-black shadow-md">
  {/* Header Section */}
  <div className="flex flex-col mb-10 sm:flex-row items-center max-w-4xl mx-auto">
    <img
      src={imageUrl}
      alt="Profile"
      className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-6"
    />
    <div className="flex  flex-col">
      <h1 className="text-2xl font-semibold">{contact.fullName}</h1>
      <p>{contact.occupation}</p>
      <p>{contact.country}</p>
      <div className="flex space-x-4 mt-2">
        {contact.socialMedia.linkedIn && (
          <a href={contact.socialMedia.linkedIn} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-600" size={24} />
          </a>
        )}
        {contact.socialMedia.twitter && (
          <a href={contact.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400" size={24} />
          </a>
        )}
        {contact.socialMedia.email && (
          <a href={`mailto:${contact.socialMedia.email}`}>
            <FaEnvelope className="text-gray-600" size={24} />
          </a>
        )}
      </div>
    </div>
    <div className="ml-auto text-right">
      <p>Karma Points: {contact.relationshipTracking.karmaPoints}</p>
      <p>Status: {contact.status}</p>
      <p>Affiliation: {contact.affiliation}</p>
    </div>
  </div>

  {/* Bio Section */}
  <div className="my-4 max-w-4xl mb-10 mx-auto">
    <h2 className="text-xl font-semibold">Bio</h2>
    <p>{contact.bio}</p>
  </div>

  <div className="my-4 max-w-4xl mb-10 mx-auto">
    <h2 className="text-xl font-semibold">Industry</h2>
    <p>{contact.industry}</p>
  </div>

  {/* Skills */}
  <div className="my-4 max-w-4xl mb-10 mx-auto">
    <h2 className="text-xl font-semibold">Skills</h2>
    <div className="flex space-x-2">
      {contact.skills.map((skill, index) => (
        <span key={index} className="bg-gray-200 px-2 py-1 rounded">
          {skill.skillName}
        </span>
      ))}
    </div>
  </div>

  {/* Wants & Provides */}
  <div className="flex justify-center mb-10 my-4 max-w-4xl mx-auto space-x-4">
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-center mb-2">Wants:</h2>
      <ul className="list-disc list-inside text-lg">
        {contact.relationshipTracking.whatTheyNeed.map((want, index) => (
          <li key={index}>{want}</li>
        ))}
      </ul>
    </div>

    {/* Vertical Line */}
    <div className="hidden sm:block w-1 bg-gray-300 mx-4"></div>

    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-center mb-2">Provides:</h2>
      <ul className="list-disc list-inside text-lg">
        {contact.relationshipTracking.whatTheyCanProvide.map((provide, index) => (
          <li key={index}>{provide}</li>
        ))}
      </ul>
    </div>
  </div>

  {/* Kappa Chart */}
  <div className="my-4 mb-10 max-w-4xl mx-auto">
    <h2 className="text-xl font-semibold">Kappa Points:</h2>
    <Line data={kappaData} options={kappaOptions} />
  </div>
  <div className="card-actions justify-end mt-4">
        <button className="btn btn-primary" onClick={()=>setIsFormOpen(true)}>
          Edit
        </button>
      </div>

      <div className="mt-4">
        <Link to="/contacts">
          <button className="btn btn-sm btn-outline-secondary">
            ← Back to Listing
          </button>
        </Link>
      </div>
      {isFormOpen && 
        <ContactForm
        existingContact={contact}
        onSubmit={handleUpdate}
        />
    }
    </div>
      );
}

export default ContactDetail