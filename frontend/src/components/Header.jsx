import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';  // Importing settings icon
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const {authUser} = useAuthContext();
  const {logout} = useLogout();
    

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const oldPassword = event.target.oldPassword.value;
    const newPassword = event.target.newPassword.value;
    const id = authUser._id;
    
    try {
        await axios.patch('/api/auth/password',{id,oldPassword,newPassword});
    } catch (error) {
      console.log("error in changing password",error);
    }
   
    handleCloseModal(); 
    logout();
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 lg:px-10">
      <div className="navbar-start">
        <Link to="/home" className="text-2xl font-bold text-primary">Ramona Holdings</Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/ideas" className="font-semibold text-primary text-xl">Ideas</Link>
          </li>
          <li>
            <Link to="/deals" className="font-semibold text-primary text-xl">Deals</Link>
          </li>
          <li>
            <Link to="/contacts" className="font-semibold text-primary text-xl">Contacts</Link>
          </li>
          <li>
            <Link to="/theses" className="font-semibold text-primary text-xl">Business</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center">

        <div className="dropdown dropdown-end mr-5">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <FiSettings size={24} />  
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={handleOpenModal}>Change Password</button>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>

        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 z-10 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/ideas">Ideas</Link>
              </li>
              <li>
                <Link to="/deals">Deals</Link>
              </li>
              <li>
                <Link to="/contacts">Contacts</Link>
              </li>
              <li>
                <Link to="/theses">Business</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

     
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Old Password</span>
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Change</button>
                <button type="button" className="btn" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
