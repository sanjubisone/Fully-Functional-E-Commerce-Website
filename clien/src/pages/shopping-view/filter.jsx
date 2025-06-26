import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { filterOptions } from '@/config'
import { Separator } from "@/components/ui/separator"
import React, { Fragment,useState } from 'react'


function ProductFilter({selectedFilters ,setSelectedFilters}) {

    

  const handleCheckboxChange = (keyitem, optionValue, checked) => {

    setSelectedFilters(prev => {
      const currentValues = prev[keyitem] || [];
    console.log('currentValues',currentValues)
    console.log(prev) 
        console.log('keyitem ', keyitem) 
        console.log('optionValue ',optionValue)
        console.log('checked ',checked)
    
      return {
        ...prev,
        [keyitem]: checked
          ? [...currentValues, optionValue]               // Add to selected
          : currentValues.filter(v => v !== optionValue)  // Remove if unchecked
      };
      
    });

   
  };



    return (
        <div className='bg-background rounded-lg shadow-sm'>

            <div className='p-4 border-b'>
                <h2 className='text-lg font-semibold'>filters</h2>

            </div>
            <div className='p-4 space-y-4'>

                {
                    Object.keys(filterOptions).map(keyitem => <Fragment>

                        <div>
                            <h3 className='text-base font-extrabold'>
                                {
                                    keyitem
                                }
                            </h3>
                            <div className='grog gap-2 mt-2'>
                                {
                                    filterOptions[keyitem].map(options =>
                                        <Label className='flex items-center font-medium gap-2'>
                                            {<Checkbox  checked={
                        selectedFilters[keyitem]?.includes(options.value) || false
                      }
                      onCheckedChange={checked =>
                        handleCheckboxChange(keyitem, options.value, checked)
                      } />}
                                            {options.label}

                                        </Label>)
                                }

                            </div>
                        </div>
                        <Separator />

                    </Fragment>)
                }

            </div>

        </div>
    )
}

export default ProductFilter
