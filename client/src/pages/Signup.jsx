import {Link} from 'react-router-dom';
import { useState } from 'react';
const Signup = () => {
  const [formData,setFormData]=useState({})
const handleChange=(e)=>{
 setFormData({
  ...formData,
  [e.target.id]:e.target.value,
 });
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  const res=await fetch("/api/auth/signup",
  {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  }
  );
  const data=await res.json();
  console.log(data);
};
 console.log(formData);
 
return(
  <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>
      Sign Up
    </h1>
    <form onSubmit={handleSubmit}className='flex flex-col gap-4'>
      <input type="text"placeholder='username'
      className='border p-3 rounded-lg'id='username'onChange={handleChange}/>
      <input type="text"placeholder='email'
      className='border p-3 rounded-lg'id='email'onChange={handleChange}/>
      <input type="text"placeholder='password'
      className='border p-3 rounded-lg'id='password'onChange={handleChange}/>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>

    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
      </Link>
    </div>
  </div>
);
};
export default Signup;

