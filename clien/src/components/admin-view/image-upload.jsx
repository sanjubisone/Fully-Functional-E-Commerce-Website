
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useEffect, useRef } from 'react'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';





function Productimageupload({ imageFile, setimageFile, uploadedImageUrl, setuploadedImageUrl, setimageloading,imageloading }) {
  const inputref = useRef(null)


  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setimageFile(selectedFile);

  }

  function handleDragOver(event) {
    event.preventDefault()


  }



  function handleDrop(event) {
    event.preventDefault()
    const dropedfile = event.dataTransfer.files?.[0]
    if (dropedfile) setimageFile(dropedfile)
  }

  function handleRemoveImage() {
    setimageFile(null)
    if (inputref.current) {
      inputref.current.value = ''
    }

  }

  async function uploadImagetoCloudnary() {
    setimageloading(true)
    const data = new FormData();
    data.append('my_file', imageFile)
    const res = await axios.post('https://fully-functional-e-commerce-website.onrender.com/api/admin/products/upload-image', data)
    if (res?.data?.success) {
      setuploadedImageUrl(res.data.result.url)
      setimageloading(false)
    }
    console.log('response ', res)
  }


  useEffect(() => {
    if (imageFile !== null) uploadImagetoCloudnary()
    console.log('useeffect called')
  }, [imageFile])


  return (
    <div className='w-full max-w-md mx-auto mt-4'>
      <Label className='text-lg font-semibold mc-2 block'>upload image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4'>
        <Input id='image-upload' type='file' className='hidden' ref={inputref} onChange={handleImageFileChange} />
        {!imageFile ?
          <Label htmlFor='image-upload' className='flex flec-col items-center justify-center h-32 cursor-pointer'>
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
            <span>drag & drop or click to upload image</span>
          </Label>

          : 
          imageloading ? <Skeleton className='h-10 bg-gray-100'/> :
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <FileIcon className='w-8 h-8 text-primary mr-2' />

            </div>
            <p className='text-sm font-medium'>{imageFile.name}</p>
            <Button variant="ghost" size='icon' className='text-muted-foreground hover : text-foreground' onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4' />
              <span className='sr-only'>Remove File</span>
            </Button>

          </div>}



      </div>
    </div>
  )
}

export default Productimageupload
