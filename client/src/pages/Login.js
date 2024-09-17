import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)

  const handleLogin = async(e) => {
    try {
      e.preventDefault()
      const response = await axios.post("/login",{email,password})
      setUser(response.data)
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=''>
        <h1 className='text-4xl text-center my-14'>Login</h1>
        <form className='flex flex-col max-w-md mx-auto gap-1' onSubmit={handleLogin}>
            <input type='email' placeholder='your@email.com' value={email} onChange={(ev)=>setEmail(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <input type='password' placeholder='password'  value={password} onChange={(ev)=>setPassword(ev.target.value)} className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <button className='bg-primary p-2 text-white rounded-2xl'>Login</button>
            <div className="text-center my-2 text-gray-500">Don't have an account yet? <Link className='underline text-black' to={"/register"}>Register</Link></div>
        </form>
      
    </div>
  )
}

export default Login
