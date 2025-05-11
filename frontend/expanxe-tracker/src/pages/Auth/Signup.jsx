import React,{ useState } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'

const Signup = () => {

  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('null');

  const navigate = useNavigate();
  
  //handle signup form submit

  const handleSignup = (e) => {
    e.preventDefault();
  }

  let profileImage ="";

  if(!fullName || !email || !password) 
    return setError('Please fill in all fields');
  

  if(profilePic) profileImage = URL.createObjectURL(profilePic);

  setError('null');

  //signup api call



  return (
    <Authlayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center '>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        
          <p className='text-sm text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label='Full Name'
          placeholder='Enter Name'
          />

<Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            placeholder='John@example.com'
            type='text'
          />

          <div className='col-span-2'>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password "
            placeholder=''
            type='password'
          />
          </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                  
                    <button type="submit" className='btn-primary'>
                      SIGN UP
                    </button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already have an account ?{" "}
                      <Link className="font-medium text-primary" to="/login">
                      Login
                      </Link>
                    </p>
                  </form>
          
          
           
          
          
      </div>
    </Authlayout>
  )
}

export default Signup