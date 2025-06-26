import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './side-bar'
import AdminHeader from './header'

function AdminLayout() {
  const [openSidebar , setopenSidebar]=useState(false)
  return (
    <div className='flex w-full'>
    <div className=" bg-gray-100 w-full flex">
      <div></div>
      <AdminSideBar open={openSidebar} setopen={setopenSidebar} />
      <div className='w-full m-2'>
        <div className="bg-gray-100 w-full">
          <AdminHeader setopen={setopenSidebar}/>
        </div>

        {/* </div>
        <div> */}
          <div className='flex flex-col justify-center'>

            <main className='flex-1 flex-col flex bg-muted-gray-50 rounded-lg shadow-md '>
              <Outlet />
            </main>
          </div>
        </div>
      
    </div></div>
  )
}

export default AdminLayout
