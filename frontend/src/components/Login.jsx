import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Login = () => {
   
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState(''); 

  const {loading,login} = useLogin();

   const handleSubmit= async (e)=>{
        console.log(userName,password)
        e.preventDefault();
        await login(userName,password);
   }
  return (
      <>
      <div className='w-full h-full'>
      <canvas id='c' className='fixed -z-10'></canvas> 
  <div className='z-40 text-white flex font-light font-serif justify-center items-center flex-col'>
    <p className='text-5xl'>RAMONA</p><br />
    <p className='text-3xl'>HOLDINGS</p>
  </div>

   <div className="mt-52 ml-auto md:mt-10 sm:mx-auto md:mr-20 md:ml-auto w-52 lg:w-60">
    <form className="space-y-6 mx-auto md:ml-auto w-full max-w-sm sm:max-w-none" onSubmit={handleSubmit}>
     
      <div>
        <label className="block text-sm font-medium leading-6 text-green-500">User</label>
        <div className="mt-2">
          <input value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder='John Doe' type="text" autoComplete='name' 
                 className="input input-bordered w-full bg-gray-700 text-white focus:ring-2 focus:ring-indigo-600 text-sm leading-6"/>
        </div>
      </div>

     
      <div>
        <label  className="block text-sm font-medium leading-6 text-green-500">Password</label>
        <div className="mt-2">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' type="password" autoComplete="current-password"
                 className="input input-bordered w-full bg-gray-700 text-white focus:ring-2 focus:ring-indigo-600 text-sm leading-6"/>
        </div>
      </div>

     
      <div>
        <button type="submit" disabled={loading} className="btn btn-primary w-full bg-green-600 text-white hover:bg-indigo-500">
           {loading?<span className='loading loading-spinner'></span>:"Login"}
          </button>
      </div>
    </form>
  </div>
</div>

      </>
  );
};

export default Login;
