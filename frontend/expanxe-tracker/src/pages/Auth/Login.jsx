import React from 'react'
import Authlayout from '../../components/layouts/Authlayout'

const Login = () => {
  return (
    <Authlayout>
      <div className='lg:x-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text=xl font-semibold text-black'>Welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-5'>
          Please enter your details to log in
        </p>
      </div>
    </Authlayout>
  )
}

export default Login