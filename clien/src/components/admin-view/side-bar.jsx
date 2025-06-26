import React, { Fragment } from 'react'
import {ChartNoAxesCombined ,LayoutDashboard, ShoppingBasket,ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';



const AdminSidebarMenuItems=[
    {
        id : 'dashboard',
        label :'dashboard',
        path : '/admin/dashboard',
        icons :<LayoutDashboard />,
    },
      {
        id : 'products',
        label :'products',
        path : '/admin/products',
        icons : <ShoppingBasket />,
    },
      {
        id : 'orders',
        label :'orders',
        path : '/admin/orders',
        icons : <ShieldCheck />,
    }
]

function MenuItem({setopen}){
   const navigate=useNavigate()
  return <nav className='mt-8 flex-col flex gap-2'>
{
  AdminSidebarMenuItems.map(menuItem=><div key={menuItem.id} onClick={()=>{
    navigate(menuItem.path)
    setopen ? setopen(false) : null
  } } className='flex items-center gap-2 text-xl rounded-md px-3 py-2 text-muted-foreground hover: bg-muted hover:text-foreground cursor-pointer'>
    {menuItem.icons}
    <span>{menuItem.label}</span>
  </div>)
}
  </nav>

}

function AdminSideBar({open , setopen}) {
  const navigate=useNavigate()
  return (
   <Fragment>
    <Sheet  open={open} onOpenChange={setopen}  >
      <SheetContent side='left' className='w-64'>
        <div className='flex flex-col h-full'>
          <SheetHeader className='border-b'>

             <SheetTitle className='flex gap-2 mt-5'> <ChartNoAxesCombined size={30} /><span>admin pannel</span> </SheetTitle>
          </SheetHeader>
         <MenuItem setopen={setopen} />

        </div>
      </SheetContent>
    </Sheet>
   
<aside className='hidden w-64 flex-col min-h-screen border-r bg-background p-6 lg:flex'>
  <div onClick={()=>navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
    <ChartNoAxesCombined size={30} />
    <h1 className='text-xl font-extrabold'>admin pannel</h1>
  </div>
  <MenuItem/>
</aside>

   </Fragment>
  )
}

export default AdminSideBar
