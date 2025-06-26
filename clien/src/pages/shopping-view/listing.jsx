import React, { useEffect ,useState } from 'react'
import ProductFilter from './filter'
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProduct } from '@/store/shop/productSlice'
import ShoppingProductTile from './product-tile'
import ProductDetailDialog from './product-details'


const sortProducts = (products, sortValue) => {
  const sorted = [...products]; // Original array ko mutate na kare
  localStorage.setItem("sortValue", JSON.stringify(sortValue));

  switch (sortValue) {

    case "price_low_high":
      sorted.sort((a, b) => a.salePrice - b.salePrice);

      break;

    case "price_high_low":
      sorted.sort((a, b) => b.salePrice - a.salePrice);
      break;

    case "title_az":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "title_za":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;

    default:
      // No sort, return as-is
      break;
  }

  return sorted;
};






function ShoppingListing() {


    const dispatch = useDispatch()
    const localfilter = JSON.parse(localStorage.getItem("selectedFilters")) || {};
    const localvalue = JSON.parse(localStorage.getItem("sortValue")) || null;
       const [selectedFilters, setSelectedFilters] = useState(localfilter);
       const [opendialog , setopendialog] = useState(false)
       const [product , setproduct] = useState(null)
       const [sortValue ,setsortValue]=useState(localvalue);
       console.log('localvalue' , localvalue);
       console.log('sortValue ',sortValue);
       

    const {productList} = useSelector(state => state.shopProducts);
    const sortproductList= sortProducts(productList , sortValue);
  useEffect(()=>{
    if(product!==null) setopendialog(true);
    console.log('you are clicked on this product ' , product)

  } , [product] )
    useEffect(()=>{
dispatch(fetchAllFilteredProduct(selectedFilters)).then((data) => {
const selecfilter = JSON.parse(localStorage.getItem("selectedFilters")) || {};
const mergedFilters = { ...selecfilter, ...selectedFilters };
localStorage.setItem("selectedFilters", JSON.stringify(mergedFilters));

 console.log('local storage ',mergedFilters)
      console.log('all filtered product', data) })
    },[selectedFilters])

    console.log('filtered productlist ',productList)
     console.log('selectedFilters ',selectedFilters)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md: p-6'>
      <ProductFilter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>
            All Products
          </h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{sortproductList.length} Products</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='flex items-center gap-1'>

              <ArrowUpDownIcon className='h-4 w-4'/>
              <span>Sort by</span>
              </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
             <DropdownMenuRadioGroup>
              {
                sortOptions.map(sortItem=><DropdownMenuRadioItem key={sortItem.value} onClick ={()=>{console.log(sortItem.value);
                  setsortValue(sortItem.value);
                }}>
                  {sortItem.label}
                </DropdownMenuRadioItem>)
              }
             </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 p-4'>
         {
         
          sortproductList.map((product)=>(

            <ShoppingProductTile product = {product} setproduct = {setproduct}/>
            

          ))
         }

        </div>
      </div>
     <ProductDetailDialog open = {opendialog} setOpen = {setopendialog} product ={product} />
    </div>
  )
}

export default ShoppingListing
