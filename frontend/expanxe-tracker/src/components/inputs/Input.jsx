import React from 'react'

const Input = ({value,onChange,label,placeholder,type}) => {
  
    const [showPassword,setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handlePasswordChange = (e) => setPassword(e.target.value);

    

    
  
    return (
    <div>
        <label className=''>{label}</label>

        <div className=''>
            <input 
            type ={type == 'password'? showPassword ? 'text' : 'password' : type}
            placeholder={placeholder}
            className=''
            value={value}
            onChange={(e) => onChange(e)}
        />
        </div>
    </div>
  )
}

export default Input