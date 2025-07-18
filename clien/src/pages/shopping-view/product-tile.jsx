import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
   import { addToCart} from '@/store/cart'
   import { toast } from "sonner"
function shoppingProductTile({product ,setproduct}) {
    //  console.log('inside tiled function')
    const dispatch = useDispatch();
    const {user}=useSelector(state=>state.auth)
   
      const cartdata ={
       userId : user.id,
       productId  : product?._id,
       quantity : 1,
      }
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
            })
          
          }

  return (
    <Card className='w-full max-w-sm mx-auto' onClick = {()=>setproduct(product)} >
        {
            console.log('inside tiled function')
        }

        <div>
            <div className='relative'>
                <img 
                src={product?.image}
                alt={product?.title}

                className='w-full h-[300px] rounded-t-lg'


                />
                {
                    product.salePrice > 0 ?
                    <Badge className='absolute top-2 left-2 bg-red-600 hover:bg-red-800'>
                        Sale
                    </Badge>:null
                }

            </div>

            <CardContent className='p-4'>
                <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm text-muted-foreground'>{product?.category}</span>
                    <span className='text-sm text-muted-foreground'>{product?.brand}</span>
                </div>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product.salePrice>0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>{product?.price}</span>
                    {
                        product.salePrice>0 ?  <span className={` text-lg font-semibold text-primary`}>{product?.salePrice}</span> : null
                    }
                   
                </div>

            </CardContent>
            <CardFooter>
                <Button onClick ={(e)=>{
                    e.stopPropagation(); 
                    handlecart()}} className='w-full'>Add to Cart</Button>
            </CardFooter>

        </div>

    </Card>
  )
}

export default shoppingProductTile
