import React, { useState, useEffect } from 'react';

const ContactForm = ({ existingContact, onSubmit, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [country, setCountry] = useState('');
    const [industry, setIndustry] = useState('');
    const [bio, setBio] = useState('');
    const [status, setStatus] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [socialMedia, setSocialMedia] = useState({
      linkedIn: '',
      twitter: '',
      email: ''
    });
    const [skills, setSkills] = useState([{ skillName: '' }]);
    const [relationshipTracking, setRelationshipTracking] = useState({
      whatTheyCanProvide: [''],
      whatTheyNeed: [''],
      flags: '',
      karmaPoints: 0,
      kappa: [], 
    });
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      if (existingContact) {
        setFullName(existingContact.fullName);
        setOccupation(existingContact.occupation);
        setCountry(existingContact.country);
        setIndustry(existingContact.industry);
        setBio(existingContact.bio);
        setStatus(existingContact.status);
        setAffiliation(existingContact.affiliation);
        setSocialMedia(existingContact.socialMedia);
        setSkills(existingContact.skills || [{ skillName: '' }]);
        setRelationshipTracking({
          ...relationshipTracking,
          whatTheyCanProvide: existingContact.relationshipTracking?.whatTheyCanProvide || [''],
          whatTheyNeed: existingContact.relationshipTracking?.whatTheyNeed || [],
          flags: existingContact.relationshipTracking?.flags || '',
          karmaPoints: existingContact.relationshipTracking?.karmaPoints || 0,
          kappa: Array.isArray(existingContact.relationshipTracking?.kappa) 
          ? existingContact.relationshipTracking.kappa 
          : []
        });
        setNotes(existingContact.notes || '');
        setImage(null);
      }
    }, [existingContact]);
  
    // Handling skills
    const handleSkillChange = (index, value) => {
      const newSkills = [...skills];
      newSkills[index].skillName = value;
      setSkills(newSkills);
    };
  
    const handleAddSkill = () => {
      setSkills([...skills, { skillName: '' }]);
    };
  
    const handleRemoveSkill = (index) => {
      const newSkills = skills.filter((_, i) => i !== index);
      setSkills(newSkills);
    };
  
    // Handling what they can provide and need
    const handleWhatTheyCanProvideChange = (index, value) => {
      const newProvides = [...relationshipTracking.whatTheyCanProvide];
      newProvides[index] = value;
      setRelationshipTracking({ ...relationshipTracking, whatTheyCanProvide: newProvides });
    };
  
    const handleWhatTheyNeedChange = (index, value) => {
      const newNeeds = [...relationshipTracking.whatTheyNeed];
      newNeeds[index] = value;
      setRelationshipTracking({ ...relationshipTracking, whatTheyNeed: newNeeds });
    };
  
    const handleAddProvide = () => {
      setRelationshipTracking({
        ...relationshipTracking,
        whatTheyCanProvide: [...relationshipTracking.whatTheyCanProvide, '']
      });
    };
  
    const handleAddNeed = () => {
      setRelationshipTracking({
        ...relationshipTracking,
        whatTheyNeed: [...relationshipTracking.whatTheyNeed, '']
      });
    };
  
    const handleRemoveProvide = (index) => {
      const newProvides = relationshipTracking.whatTheyCanProvide.filter((_, i) => i !== index);
      setRelationshipTracking({ ...relationshipTracking, whatTheyCanProvide: newProvides });
    };
  
    const handleRemoveNeed = (index) => {
      const newNeeds = relationshipTracking.whatTheyNeed.filter((_, i) => i !== index);
      setRelationshipTracking({ ...relationshipTracking, whatTheyNeed: newNeeds });
    };
  
    const getCurrentTime = () => new Date();
  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Create the new kappa entry
        const newKappaEntry = { time: new Date().toISOString(), value: Number(relationshipTracking.kappa) }; // Ensure 'kappaValue' holds the input for kappa
      
        // Prepare form data
        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('occupation', occupation);
        formData.append('country', country);
        formData.append('industry', industry);
        formData.append('bio', bio);
        formData.append('status', status);
        formData.append('affiliation', affiliation);
        formData.append('socialMedia', JSON.stringify(socialMedia)); // Ensure social media is formatted as JSON
        formData.append('skills', JSON.stringify(skills)); // Skills formatted as JSON
      
        // Append relationshipTracking with the new kappa value
        formData.append('relationshipTracking', JSON.stringify({
          ...relationshipTracking,
          karmaPoints: Number(relationshipTracking.karmaPoints), // Ensure karmaPoints is a number
          kappa: [...(Array.isArray(relationshipTracking.kappa) ? relationshipTracking.kappa : []), newKappaEntry] // Add the new kappa entry
        }));
      
        formData.append('notes', notes);
      
        if (image) {
          formData.append('image', image);
        }
      
        // Submit form data via the provided onSubmit handler
        onSubmit(formData);
      };
      
  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white text-black max-w-4xl">
        <h2 className="text-2xl font-bold mb-5">{existingContact ? 'Update Contact' : 'Create Contact'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Full Name:</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Occupation:</label>
            <input 
              type="text" 
              value={occupation} 
              onChange={(e) => setOccupation(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Bio:</label>
            <input 
              type="text" 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Country:</label>
            <input 
              type="text" 
              value={country} 
              onChange={(e) => setCountry(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Industry:</label>
            <input 
              type="text" 
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Status:</label>
            <input 
              type="text" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Affiliation:</label>
            <input 
              type="text" 
              value={affiliation} 
              onChange={(e) => setAffiliation(e.target.value)} 
              className="input border-black input-bordered bg-white" 
              required 
            />
          </div>
          <div className="form-control">
            <label className="label">Social Media:</label>
            <input 
              type="text" 
              placeholder="LinkedIn" 
              value={socialMedia.linkedIn} 
              onChange={(e) => setSocialMedia({ ...socialMedia, linkedIn: e.target.value })} 
              className="input border-black input-bordered bg-white"
            />
            <input 
              type="text" 
              placeholder="Twitter" 
              value={socialMedia.twitter} 
              onChange={(e) => setSocialMedia({ ...socialMedia, twitter: e.target.value })} 
              className="input border-black input-bordered bg-white mt-2"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={socialMedia.email} 
              onChange={(e) => setSocialMedia({ ...socialMedia, email: e.target.value })} 
              className="input border-black input-bordered bg-white mt-2"
            />
          </div>
          <div className="form-control">
            <label className="label">Skills:</label>
            {skills.map((skill, index) => (
              <div key={index} className="flex space-x-3 mt-2">
                <input 
                  type="text" 
                  value={skill.skillName} 
                  onChange={(e) => handleSkillChange(index, e.target.value)} 
                  className="input border-black input-bordered bg-white" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(index)} 
                  className="btn btn-sm bg-red-600 text-white">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddSkill} className="btn btn-sm mt-2">Add Skill</button>
          </div>
          <div className="form-control">
            <label className="label">What They Can Provide:</label>
            {relationshipTracking.whatTheyCanProvide.map((provide, index) => (
              <div key={index} className="flex space-x-3 mt-2">
                <input 
                  type="text" 
                  value={provide} 
                  onChange={(e) => handleWhatTheyCanProvideChange(index, e.target.value)} 
                  className="input border-black input-bordered bg-white" 
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveProvide(index)} 
                  className="btn btn-sm bg-red-600 text-white">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddProvide} className="btn btn-sm mt-2">Add Provide</button>
          </div>
          <div className="form-control">
            <label className="label">What They Need:</label>
            {relationshipTracking.whatTheyNeed.map((need, index) => (
              <div key={index} className="flex space-x-3 mt-2">
                <input 
                  type="text" 
                  value={need} 
                  onChange={(e) => handleWhatTheyNeedChange(index, e.target.value)} 
                  className="input border-black input-bordered bg-white" 
                />
                <button 
                  type="button" 
                  onClick={() => handleRemoveNeed(index)} 
                  className="btn btn-sm bg-red-600 text-white">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddNeed} className="btn btn-sm mt-2">Add Need</button>
          </div>
          <div className="form-control">
            <label className="label">Flags:</label>
            <input 
              type="text" 
              value={relationshipTracking.flags} 
              onChange={(e) => setRelationshipTracking({ ...relationshipTracking, flags: e.target.value })} 
              className="input border-black input-bordered bg-white"
            />
          </div>
          <div className="form-control">
            <label className="label">Karma Points:</label>
            <input 
              type="number" 
              value={relationshipTracking.karmaPoints} 
              onChange={(e) => setRelationshipTracking({ ...relationshipTracking, karmaPoints: Number(e.target.value) })} 
              className="input border-black input-bordered bg-white"
            />
          </div>
          <div className="form-control">
            <label className="label">Kappa:</label>
            <input 
              type="number" 
              value={relationshipTracking.kappa} 
              onChange={(e) => setRelationshipTracking({ ...relationshipTracking, kappa: Number(e.target.value) })} 
              className="input border-black input-bordered bg-white"
            />
          </div>
          <div className="form-control">
            <label className="label">Notes:</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              className="textarea border-black textarea-bordered bg-white"
            />
          </div>
          {!existingContact && <div className="form-control">
            <label className="label">Upload Image:</label>
            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="file-input bg-white file-input-bordered file-input-primary w-full"
            />
          </div>}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">{existingContact ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose} className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
