import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '../../components/common/form.jsx'
import { LoginFormcontrol } from '@/config/index2.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice/index.js';
import { toast } from "sonner"
const initialstate = {

    email: '',
    password: ''
}

function Login() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialstate);
    function onSubmit(event) {
        event.preventDefault()
        dispatch(loginUser(formData)).then(data => {
            console.log(data)
            if (data?.payload?.success) {
                toast(data?.payload?.message)
            }
            else{
                          toast(data?.payload?.message)
                        }
        }

        )
    }


return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <h2 className='text-xl font-bold'>Login</h2>
        <div className='text-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Welcome Back</h1>
            <p className='text-gray-600'>Don't have an account? <Link to="/auth/register" className='text-blue-600 hover:underline'>Register</Link></p>
        </div>
        <CommonForm formControls={LoginFormcontrol} buttonText={'Login'} formData={formData} setFormData={setFormData} onsubmit={onSubmit} />
    </div>
)

}

export default Login;




