import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '../../components/common/form.jsx'
import { registerFormcontrol } from '@/config/index.js';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice/index.js';
import { toast } from "sonner"

const initialstate={
      username:'',
      email:'',
      password:''  
    }

function Register() {
    
    const [formData,setFormData]=useState(initialstate);
const dispatch=useDispatch()
const navigate=useNavigate()


    function onSubmit(event){  
       event.preventDefault();
       
       dispatch(registerUser(formData)).then((data)=>{
        console.log(data)
         if(data?.payload?.success) {
                navigate('/auth/login'); 
                toast(data?.payload?.message)
            }
            else{
              toast(data?.payload?.message)
            }
    
    })
     }
    console.log(formData)

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <h2 className='text-xl font-bold'>Register</h2>
     <div className='text-center'>
       <h1 className='text-3xl font-semibold tracking-tight'>Create a New Account</h1>
       <p className='text-gray-600'>Already have an account? <Link to="/auth/login" className='text-blue-600 hover:underline'>Log in</Link></p>
     </div>
     <CommonForm formControls={registerFormcontrol} buttonText={'Create an Account'} formData={formData} setFormData={setFormData} onsubmit={onSubmit} />
    </div>
  )
}

export default Register;
