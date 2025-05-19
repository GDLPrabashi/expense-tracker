import React, { useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { validateEmail } from '../../utils/helper'
import  axiosInstance  from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if(!password) {
      setError('Please enter a password');
      return;
    }

    setError(null);
  
  

    //login API CALL

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const {token,user} = response.data;
      
      if(token){
        localStorage.setItem('token',token);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError('Something went wrong');
      }
      
    }
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
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            placeholder='John@example.com'
            type='text'
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password "
            placeholder=''
            type='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        
          <button type="submit" className='btn-primary'>
            Login
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account ?{" "}
            <Link className="font-medium text-primary" to="/signup">
            SignUp
            </Link>
          </p>
        </form>


      </div>
    </Authlayout>
  )
}

export default Login