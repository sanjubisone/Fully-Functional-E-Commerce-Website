import React, { useEffect, useState } from 'react'
import { House, Menu, ShoppingCart, CircleUserRound, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItem } from '@/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logoutUser } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';
import { toast } from "sonner"
import UserCartWrapper from './cart-wrapper';
import { fetchAllcartProduct } from '@/store/cart';

function MenuItems() {
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItem.map((item) => (
        <Link key={item.id} to={item.path} className='text-foreground/60 font-medium transition-colors hover:text-foreground'>{item.label}</Link>
      ))

    }
  </nav>
}


function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth)
  const [openCartSheet ,setOpenCartSheet] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  function handleLogout() {


    dispatch(logoutUser()).then(data => {
      console.log(data)
      if (data?.payload?.success) {
        toast(data?.payload?.message)
      }
      else {
        toast(data?.payload?.message)
      }
    }

    )
  }

  useEffect(()=>{
   
  },[dispatch])
   const { cartproductList } = useSelector((state) => state.cartProducts)
   console.log('sheet cartproductlist', cartproductList)

   function cartupdate(){
    setOpenCartSheet(true)
     dispatch(fetchAllcartProduct(user.id))

   }


  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>

    <Sheet open = {openCartSheet} onOpenChange = {()=>setOpenCartSheet(false)}>

    <Button onClick ={cartupdate}  variant='outline' size='icon'>
      <ShoppingCart className='w-6 h-6' />
      <span className='sr-only'>User Cart</span>
    </Button>
    <UserCartWrapper cartItems ={cartproductList}/>
    </Sheet>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black'>
          <AvatarFallback className='bg-black text-white font-extrabold'>{user?.userName[0].toUpperCase()}</AvatarFallback>

        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' className='w-56'>
        <DropdownMenuLabel>
          loged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/shop/account')}>
          <CircleUserRound className='mr-2 h-4 w-4' />Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut /> Logout
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>

  </div>

}


function ShoppingHeader() {

  const { user } = useSelector((state) => state.auth)
 
  console.log(user, 'user')


  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background' >
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>

        <Link to='/shop/home' className='flex items-center gap-2'><House className='h-6 w-6' /><span className='font-bold'>Ecommerce</span></Link>

        <Sheet>

          <SheetTrigger asChild>
            <Button variant='outline ' size='icon' className='lg:hidden' >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>toggle header menu </span>
            </Button>

          </SheetTrigger>
          <SheetContent side='left' className='max-w-xs pt-6 pl-4'>

            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block' >
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>

      </div>
    </header>
  )
}

export default ShoppingHeader
