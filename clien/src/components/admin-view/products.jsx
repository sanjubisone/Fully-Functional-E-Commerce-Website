import React, { Fragment, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import CommonForm from '../common/form'
import { addProductFormElement } from '@/config'
import Productimageupload from './image-upload'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProduct, addNewProduct, editProduct, deleteProduct } from '@/store/admin/product-slice';
import { toast } from "sonner"
import ProductTile from './product-tile'



const initialformdata = {


  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: ''

}

function AdminProducts() {
  const [openproductdiolog, setopenproductdiolog] = useState(false)
  const [formData, setFormData] = useState(initialformdata)
  const dispatch = useDispatch()

  const { productList } = useSelector((state) => state.adminProducts)
  //  const { productList = [] } = useSelector(state => state.adminProducts || {});

  const [imageFile, setimageFile] = useState(null)
  const [uploadedImageUrl, setuploadedImageUrl] = useState(null)
  const [imageloading, setimageloading] = useState(false)
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [deleteid, setdeleteid] = useState(null)



  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      image: uploadedImageUrl
    }));
  }, [uploadedImageUrl]);


  useEffect(() => {
    if (deleteid) {
      //  dispatch(deleteProduct(deleteid))
      dispatch(deleteProduct(deleteid)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct())

          toast('product deleted  succefully')

          setdeleteid(null)
        }
      });
    }

  }, [deleteid])



  function onSubmit(event) {
    event.preventDefault();

    console.log('formdata onsubmit', formData)
    if (currentEditedId) {
      console.log('this product will be edited')
      dispatch(editProduct({ id: currentEditedId, formData })).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct())
          setimageFile(null)
          setFormData(initialformdata)
          toast('product updated  succefully')
          setopenproductdiolog(false)
          setCurrentEditedId(null)
        }
      });

    }
    else {

      dispatch(addNewProduct(formData)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct())
          setimageFile(null)
          setFormData(initialformdata)
          toast('product added succefully')
          setopenproductdiolog(false)
        }
      })

    }
  }


  useEffect(() => {
    dispatch(fetchAllProduct()).then((data) => {
      console.log(data)

    })
  }, [dispatch])

  console.log('productList ', productList)

  console.log('formdata', formData)


  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key] !== '').every((item) => item);
  }

  console.log(!isFormValid())
  return (
    <Fragment>

      <div className='mb-5 flex justify-end w-full'>

        <Button onClick={() => { setFormData(initialformdata); setopenproductdiolog(true); setCurrentEditedId(null) }}>Add New Product</Button>

      </div>

      <div className='grid gap-4 md: grid-cols-3 lg: grid-cols-4 '>


        {console.log('productList view ', productList)}

        {
          productList && productList.length > 0 ?
            productList.map((item) => (


              <ProductTile item={item} key={item._id} setopenproductdiolog={setopenproductdiolog} setFormData={setFormData} setCurrentEditedId={setCurrentEditedId} setdeleteid={setdeleteid} />
            )) : <p>No products to display. Add a new product to see it here.</p>

        }

      </div>

      <Sheet open={openproductdiolog} onOpenChange={setopenproductdiolog}>

        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>{currentEditedId ? 'update this product' : 'add new product'}</SheetTitle>
          </SheetHeader>
          <Productimageupload imageFile={imageFile} setimageFile={setimageFile} uploadedImageUrl={uploadedImageUrl} setuploadedImageUrl={setuploadedImageUrl} setimageloading={setimageloading} imageloading={imageloading} />
          <div className='py-6'>
            <CommonForm formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElement}
              buttonText={currentEditedId ? 'update product' : 'Add product'}
              isBtnDisabled = {!isFormValid()}
              onsubmit={onSubmit} />

          </div>
        </SheetContent>

      </Sheet>


    </Fragment >
  )
}

export default AdminProducts
