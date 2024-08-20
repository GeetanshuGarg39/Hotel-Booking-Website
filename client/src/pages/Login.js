import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className=''>
        <h1 className='text-4xl text-center my-14'>Login</h1>
        <form className='flex flex-col max-w-md mx-auto gap-1'>
            <input type='email' placeholder='your@email.com' className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <input type='password' placeholder='password' className='w-full border my-1 py-2 px-3 rounded-2xl'></input>
            <button className='bg-primary p-2 text-white rounded-2xl'>Login</button>
            <div className="text-center my-2 text-gray-500">Don't have an account yet? <Link className='underline text-black' to={"/register"}>Register</Link></div>
        </form>
      
    </div>
  )
}

export default Login
