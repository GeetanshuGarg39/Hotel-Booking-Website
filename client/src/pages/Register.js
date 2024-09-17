import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const registerUser = async(e) =>{
    try{
      e.preventDefault()
      await axios.post('register',{
        name,email,password
      })
      // <Navigate to=""/>
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className=''>
        <h1 className='text-4xl text-center my-14'>Register</h1>
        <form className='flex flex-col max-w-md mx-auto gap-1' onSubmit={registerUser}>
            <input type='text' placeholder='for ex : John Doe' value={name} onChange={(ev)=>setName(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <input type='email' placeholder='your@email.com' value={email} onChange={(ev)=>setEmail(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <input type='password' placeholder='password'  value={password} onChange={(ev)=>setPassword(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <button className='bg-primary p-2 text-white rounded-2xl'>Register</button>
            <div className="text-center my-2 text-gray-500">Already a member? <Link className='underline text-black' to={"/login"}>Login</Link></div>
        </form>
      
    </div>
  )
}

export default Register
