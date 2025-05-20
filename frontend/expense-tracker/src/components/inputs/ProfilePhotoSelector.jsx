import React, { useRef, useState } from 'react'
import {LuUser,LuUpload,LuTrash} from "react-icons/lu"

const ProfilePhotoSelector = ({image,setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }

        event.target.value = '';
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChoodeFile = () => {
        inputRef.current.click();
    }


    return (
        <div className='flex justify-center mb-6 '>
            <input 
            type='file'
             className='hidden' 
             ref={inputRef} 
             onChange={handleImageChange} />


            {!image ? (
                <div className=' w-20 h-20 flex relative items-center justify-center gap-2 bg-purple-100 rounded-full cursor-pointer' onClick={onChoodeFile}>
                  <LuUser size={40} className='text-primary'/>

                  <button
                  type='submit'
                  className='w-8 h-8 flex items-center justify-center text-white absolute -bottom-1 -right-1 bg-primary rounded-full'
                  onClick={onChoodeFile}
                  >
                    <LuUpload/>
                  </button>
        </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-2 cursor-pointer relative' onClick={onChoodeFile}>
                  <img src={previewUrl} className='w-40 h-40 rounded-full object-cover  ' />
                  <button
                  type='submit'
                  className='text-sm text-primary font-medium w-8 h-8 items-center justyfy-center bg-red-500 text-white absolute -bottom-1 -right-1 rounded-full -bottom-1 -right-1'
                  onClick={handleRemoveImage}
                  >
                    <LuTrash/>
                  </button>
        </div>
            )}
        </div>
  )
}

export default ProfilePhotoSelector