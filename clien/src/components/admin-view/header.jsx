import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify ,LogOut } from 'lucide-react';
import { logoutUser } from '@/store/auth-slice';
import { toast } from "sonner"
import { useDispatch } from 'react-redux';


function AdminHeader({setopen}) {
const dispatch = useDispatch();
function handleLogout(){
  console.log('you have try to lgout');

   dispatch(logoutUser()).then(data => {
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
   <header className='flex flex-center justify-between px-4 py-3 bg-backgroung border-b'>

<Button onClick={()=>setopen(true)} className='lg:hidden sm:block'>
  <AlignJustify />
  <span className='sr-only'>toggle menu</span>
</Button>
<div className='flex flex-1 justify-end'>
  <Button onClick ={()=>handleLogout()} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
    <LogOut />
    logout
  </Button>
</div>

   </header>
  )
}

export default AdminHeader
