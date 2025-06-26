import React from 'react'
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='hidden lg:flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>Welcome to the Auth Page</h1>
      </div>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout;
