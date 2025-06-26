import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'



function ProductTile({ item ,setopenproductdiolog ,setFormData ,setCurrentEditedId ,setdeleteid}) {


function handleEdite(){
  setopenproductdiolog(true)
  setFormData(item)
  setCurrentEditedId(item._id)
}

  return (

    
    <Card className="w-full">
  <CardHeader>
    <CardTitle className="text-lg font-semibold">{item?.title || 'Untitled Product'}</CardTitle>
    <CardDescription>{item?.description || 'No description available.'}</CardDescription>
  </CardHeader>

  <CardContent>
    {item?.image ? (
      <img
        src={item.image}
        alt={item.title}
        className="aspect-square object-cover w-full rounded-md"
      />
    ) : (
      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
        No Image
      </div>
    )}

    <div className="mt-4 space-y-1 text-sm text-muted-foreground">
      <p><span className="font-medium text-black">Brand:</span> {item?.brand || 'N/A'}</p>
      <p><span className="font-medium text-black">Category:</span> {item?.category || 'N/A'}</p>
      <p><span className="font-medium text-black">Stock:</span> {item?.totalStock || '0'} units</p>
      <p><span className="font-medium text-black">Price:</span> ₹{item?.price || '0.00'}</p>
      <p><span className="font-medium text-black text-red-500">Sale Price:</span> ₹{item?.salePrice || item?.price || '0.00'}</p>
    </div>
  </CardContent>

  <CardFooter className="flex justify-between">
    <Button onClick={() => handleEdite()} >Edit</Button>
    <Button onClick={() => setdeleteid(item._id)} variant="destructive">Delete</Button>
  </CardFooter>
</Card>
  )
}

export default ProductTile
