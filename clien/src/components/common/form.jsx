
import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function commonForm({ formControls,formData, setFormData,onsubmit,buttonText ,isBtnDisabled }) {



function renderInputsByType(controlItem) {
const value=formData?.[controlItem.name] || ''

  switch (controlItem.componenttype) {
    case 'input':
      return (
       
        <Input
          type={controlItem.type}
          id={controlItem.name}
          name={controlItem.name}
          placeholder={controlItem.placeholder}
          value={value}
          required={controlItem.required}
          className='border border-gray-300 rounded-md p-2'
           onChange={event=>setFormData({
            ...formData,
            [controlItem.name] : event.target.value}
          )}
        />
      );
      break;
    case 'textarea':
      return (
        <textarea
        type={controlItem.type}
          id={controlItem.name}
          name={controlItem.name}
          value={value}
          placeholder={controlItem.placeholder}
          required={controlItem.required}
          className='border border-gray-300 rounded-md p-2'
           onChange={event=>setFormData({
            ...formData,
            [controlItem.name] : event.target.value}
          )}
        />
      );
      break;
    case 'select':
      return (
        <Select
          value={value}
          onValueChange={(currentValue) => setFormData({
            ...formData,
            [controlItem.name]: currentValue
          })}
          required={controlItem.required}
        >

          <SelectTrigger className="w-full">
        <SelectValue placeholder={controlItem.placeholder} />
      </SelectTrigger>



      

         <SelectContent>
 <SelectGroup>
          <SelectLabel>{controlItem.placeholder}</SelectLabel>
{controlItem.options.map((option, index) => (
    <SelectItem  key={index} value={option.value}>
      {option.label}
    </SelectItem >
  ))}  

         </SelectGroup>

        
       </SelectContent>
   

    
        </Select>
      );
    // Add more cases for different component types as needed
    default:
      return ( <input
          type={controlItem.type}
          id={controlItem.name}
          name={controlItem.name}
          value={value}
          placeholder={controlItem.placeholder}
          required={controlItem.required}
          className='border border-gray-300 rounded-md p-2'
          onChange={event=>setFormData({
            ...formData,
            [controlItem.name] : event.target.value}
          )}
        />)
      break;
  }
}


  return (
    <form onSubmit={onsubmit} >

      <div className='flex flex-col gap-4'>
        {formControls.map((controlItem) => {
          return (
            <div key={controlItem.name} className='grid w-full grid-cols-1 gap-2'>
              <label htmlFor={controlItem.name} className='text-sm font-medium text-gray-700'>
                {controlItem.label}
              </label>
              {
                renderInputsByType(controlItem)
              }
            </div>
          );
        })}
      </div>
      <Button type='submit' disabled ={isBtnDisabled} className="mt-2 w-full">{buttonText || 'Submit'}</Button>

    </form>
  );

}


export default commonForm
