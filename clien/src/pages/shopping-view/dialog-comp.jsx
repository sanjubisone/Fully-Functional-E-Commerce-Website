import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CommonForm from '../../components/common/form.jsx'
import {addressFormElements} from '@/config/index.js'
import { useDispatch, useSelector } from 'react-redux';
import {addAddress} from '@/store/address/index.js'
 import { toast } from "sonner"

const DialogComp = (length) => {

    console.log('lenth og address is ',length.length)

  const [openDialog, setOpenDialog] = useState(true); //
   const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
  });
 

 const dispatch = useDispatch()
const {user}=useSelector(state=>state.auth)
    // console.log('account user',user)
   const needata ={...formData ,userId : user.id}
    function onSubmit(event){
       event.preventDefault()
          dispatch(addAddress(needata)).then(data => {
              // console.log(data)
             
              if (data?.payload?.success) {
                  toast('address added successfully')

              }

              
              else{
                            toast('error occured in address adding')
                          }
                          window.location.reload();

          }
  
          )
  
    }

 

 

  return (
    <>
      {/* Manually trigger condition */}
      

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* Optional: hide DialogTrigger if you're controlling via button */}

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add your Address</DialogTitle>
            <DialogDescription>
              This is your address where your delivery will come.
            </DialogDescription>
          </DialogHeader>
          <div className="h-[70vh] overflow-auto">
            <CommonForm
              formControls={addressFormElements}
              buttonText={'Add address'}
              formData={formData}
              setFormData={setFormData}
              onsubmit={onSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComp;
