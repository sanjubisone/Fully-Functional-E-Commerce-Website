

import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import {
 
  Shirt,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpen,
  MonitorSmartphone,
  UtensilsCrossed,
  Flame,
 
  Cpu,
  ShoppingBag,
  
} from "lucide-react";
import { Card ,CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingProductTile from './product-tile'
import { fetchAllFilteredProduct } from '@/store/shop/productSlice'
import ProductDetailDialog from './product-details'

const categoriesWithIcon = [
  { id: "electronics", label: "Electronics", icon: MonitorSmartphone },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "clothing", label: "Clothing", icon: Shirt },
  { id: "home_kitchen", label: "Home & Kitchen", icon: UtensilsCrossed },
];

const brandsWithIcon = [
  { id: "apple", label: "Apple", icon: Cpu },                  // Electronics
  { id: "samsung", label: "Samsung", icon: MonitorSmartphone }, // Electronics
  { id: "nike", label: "Nike", icon: Flame },                  // Clothing
  { id: "adidas", label: "Adidas", icon: ShoppingBag },        // Clothing
  { id: "penguin", label: "Penguin", icon: BookOpen },         // Books
  { id: "harpercollins", label: "HarperCollins", icon: BookOpen }, // Books
  { id: "prestige", label: "Prestige", icon: UtensilsCrossed },// Home & Kitchen
  { id: "philips", label: "Philips", icon: UtensilsCrossed },  // Home & Kitchen
];
function ShoppingHome() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch()
  const one ='https://plus.unsplash.com/premium_photo-1749826522504-6c7f7f361862?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const two ='https://plus.unsplash.com/premium_photo-1749723951265-6e289d2a8113?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  const three = 'https://plus.unsplash.com/premium_photo-1749756289802-f4d113c0b8ef?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const featureImageList =[one ,two ,three]
   const [product , setproduct] = useState(null)
 const [opendialog , setopendialog] = useState(false)

  useEffect(()=>{
     if(product!==null) setopendialog(true);
     console.log('you are clicked on this product ' , product)
 
   } , [product] )
    useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

   const navigate = useNavigate();

   function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("selectedFilters");
    // localStorage.setItem("selectedFilters", JSON.stringify(mergedFilters));
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    // sessionStorage.setItem("selectedFilters", JSON.stringify(currentFilter));
     localStorage.setItem("selectedFilters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  useEffect(()=>{
    dispatch(fetchAllFilteredProduct({category : ['electronics','clothing']})).then((data)=>console.log('home filter product',data))

  },[])
  const {productList} = useSelector(state => state.shopProducts);


  console.log('home produc list',productList)
  return (
     <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
          
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

           <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    // handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    setproduct = {setproduct}
                    // handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
<ProductDetailDialog open = {opendialog} setOpen = {setopendialog} product ={product} />
      </div>
  )
}

export default ShoppingHome
