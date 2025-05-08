import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import {useNavigate} from 'react-router-dom'
import Input from '../../components/inputs/input'

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('null');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard')
  }
  
  return (
    <Authlayout>
      <div className='lg:x-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text=xl font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-5'>
          Please enter your details to log in
        </p>

      <form onSubmit={handleLogin}>
        <Input 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        label="Email address"
        placeholder='John@example.com'
        type='text'
       />
      </form>


      </div>
    </Authlayout>
  )
}

export default Login