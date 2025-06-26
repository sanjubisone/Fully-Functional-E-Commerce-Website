import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { addToCart ,fetchAllcartProduct } from '@/store/cart'
import { StarIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 import { toast } from "sonner"


function ProductDetailDialog({open ,setOpen , product}) {
    console.log('detail function run')
     

      const {user}=useSelector(state=>state.auth)
      const dispatch = useDispatch()
      const cartdata ={
       userId : user.id,
       productId  : product?._id,
       quantity : 1,
      }
      const userId = {userId : user.id}

      console.log('user_id' , user.id)
      useEffect(()=>{
 dispatch(fetchAllcartProduct(user.id))
      },[dispatch])

     


      function handlecart (){
        console.log('you are clicked on add to card button')
        dispatch(addToCart(cartdata)).then((data)=>{
                console.log('this is handle cart data ',data)
                  if (data?.payload?.success) {
                                toast('Item succssfully added to cart')
                            }
                            else{
                                          toast('something wrong went')
                                        }
        }
    )

      }




    
  return (
    <Dialog open = {open} onOpenChange = {setOpen} >
    <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>

        <div className='relative overflow-hidden rounded-lg'>
      <img src={product?.image} alt={product?.title } width={600} height={600} className='aspect-square w-full object-cover' />

        </div>
        <div className=''>
            <h1 className='font-3xl font-extrabold'>{product?.title}</h1>
            <p className='text-muted-foreground text-3xl mb-5 mt-4'>{product?.description}</p>
            <div>
                <div className='flex items-center justify-between'>
                    <p className={`text-3xl font-bold text-primary ${product?.salePrice > 0  ? 'line-through' : ''}`}>${product?.price}</p>
                    {
                        product?.salePrice > 0 ? <p className = 'text-2xl font-bold text-muted-foreground'>{product?.salePrice}</p>:''

                    }
                </div>
                    <div className='flex items-center gap-2 mt-2'>
                         <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <span className='text-muted-foreground'>(4.9)</span>

                    </div>

            </div>

            <div className='mt-5 mb-5'>

   
 
            <Button  onClick ={()=>handlecart()} className='w-full'>Add to Cart</Button>

            </div>
                    <Separator/>

                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>
                                    SM
                                </AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sanju Bisone</h3>

                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <p className='text-muted-foreground'>this is a beutifull product</p>
                                </div>
                            </div>
                           < div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>
                                    SM
                                </AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sanju Bisone</h3>

                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <p className='text-muted-foreground'>this is a beutifull product</p>
                                </div>
                            </div>
                           < div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>
                                    SM
                                </AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sanju Bisone</h3>

                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <p className='text-muted-foreground'>this is a beutifull product</p>
                                </div>
                            </div>
                           < div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>
                                    SM
                                </AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sanju Bisone</h3>

                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <p className='text-muted-foreground'>this is a beutifull product</p>
                                </div>
                            </div>
                           < div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                <AvatarFallback>
                                    SM
                                </AvatarFallback>
                                </Avatar>

                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Sanju Bisone</h3>

                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>
                                        <StarIcon className='w-5 h-5 fill-primary'/>

                                    </div>
                                    <p className='text-muted-foreground'>this is a beutifull product</p>
                                </div>
                            </div>

                        </div>
                    <div className='mt-6 flex gap-2'>
                     <Input placeholder = 'write a review ...'/>
                     <Button>Submit</Button>
                    </div>
                    </div>

        </div>

    </DialogContent>
    </Dialog>
  )
}

export default ProductDetailDialog



