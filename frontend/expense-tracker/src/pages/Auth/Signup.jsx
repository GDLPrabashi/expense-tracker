import React,{ useState,useContext } from 'react'
import Authlayout from '../../components/layouts/Authlayout'
import { useNavigate, Link } from 'react-router-dom'
import Input from '../../components/inputs/input'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage';

const Signup = () => {

  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  
  //handle signup form submit

  const handleSignup = async(e) => {
    e.preventDefault();

    let profileImageUrl = '';
  


  if(!fullName || !email || !password) {
    setError('Please fill in all fields');
    return;
  }

  if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
  

  
    setError(null);

     
    // if (profilePic) {
    //   profileImage = URL.createObjectURL(profilePic);
    // }
  

   //if(profilePic) profileImage = URL.createObjectURL(profilePic);

  // setError(null);

  //signup api call

  try {

    if(profilePic){
      const imgUploadRes = await uploadImage(profilePic);
      profileImageUrl = imgUploadRes.imageUrl || "";
    }

    console.log("Profile Image URL:", profileImageUrl);


    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      fullName,
      email,
      password,
      profileImageUrl
    })

    const {token,user} = response.data;
    
    if(token){
      localStorage.setItem('token',token);
      updateUser(user);
      navigate('/dashboard');
    }
  }catch (error) {
    console.error("Signup error:", error);
    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    }else{
      setError('Error signing up user');
    }
  }

  }

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