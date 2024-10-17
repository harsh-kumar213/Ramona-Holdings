import React from 'react'
import { useNavigate } from 'react-router-dom';

const Theses = ({thesis}) => {
    console.log(thesis)
    const trimmedContent = thesis.description.length>100?`${thesis.description.substring(0,100)}...`:thesis.description;

    const navigate = useNavigate();
    const toDetail =()=>{
        navigate(`/theses/${thesis._id}`);
    }
    const toCompanies =()=>{
        navigate(`/theses/companies/${thesis._id}`);
    }
  return (
    <div  className="card border-black shadow-xl bg-slate-50 mb-5 text-primary-content w-96">
  <div className="card-body">
    <h2 onClick={toCompanies} className="card-title cursor-pointer">{thesis.title}</h2>
    <p>{trimmedContent}</p>
    <div className="card-actions justify-end">
      <button className="btn" onClick={toDetail}>Details</button>
    </div>
  </div>
</div>
  )
}

export default Theses