

export const registerFormcontrol = [
    {
        name: "username",
        type: "text",
        placeholder: "enter username",
        required: true,
        label: "Username",
        componenttype: "input",
    },
    {
        name: "email",
        type: "email",
        placeholder: "enter email",
        required: true,
        label: "Email",
        componenttype: "input",
    },
    {
        name: "password",
        type: "password",
        placeholder: "enter password",
        required: true,
        label: "Password",
        componenttype: "input",
    },
    {
        name: "confirmPassword",
        type: "password",
        placeholder: "enter confirm password",
        required: true,
        label: "Confirm Password",
        componenttype: "input",
    },
]

 export const addProductFormElement = [
  {
    label: "Product Title",
    name: "title",
    component: "input",
    componenttype: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    component: "textarea",
    componenttype: "textarea",
    placeholder: "Enter product description",
  },
  
  {
    label: "Brand",
    name: "brand",
    component: "select",
    componenttype: "select",
    type: "text",
    placeholder: "Select brand name",
   options : [
  { label: "Apple", value: "apple" },            // Electronics
  { label: "Samsung", value: "samsung" },        // Electronics
  { label: "Nike", value: "nike" },              // Clothing
  { label: "Adidas", value: "adidas" },          // Clothing
  { label: "Penguin", value: "penguin" },        // Books
  { label: "HarperCollins", value: "harpercollins" }, // Books
  { label: "Prestige", value: "prestige" },      // Home & Kitchen
  { label: "Philips", value: "philips" },        // Home & Kitchen

],
  },
  {
    label: "Category",
    name: "category",
    component: "select",
    componenttype: "select",
    placeholder: "Select a category",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Books", value: "books" },
      { label: "Home & Kitchen", value: "home_kitchen" },
    ],
  },
  {
    label: "Price",
    name: "price",
    component: "input",
    componenttype: "input",
    type: "number",
    placeholder: "Enter original price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    component: "input",
    componenttype: "input",
    type: "number",
    placeholder: "Enter sale price (if any)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    component: "input",
    componenttype: "input",
    type: "number",
    placeholder: "Enter total stock available",
  },
];

export const shoppingViewHeaderMenuItem =[
  {
    id : 'home',
    label : 'Home',
    path : '/shop/home'
  },
  {
    id : 'electronics',
    label : 'Electronics',
    path : '/shop/listing'
  },

// { label: "Electronics", value: "electronics" },
//       { label: "Clothing", value: "clothing" },
//       { label: "Books", value: "books" },
//       { label: "Home & Kitchen", value: "home_kitchen" },

  {
    id : 'clothing',
    label : 'Clothing',
    path : '/shop/listing'
  },
  {
    id : 'home_kitchen',
    label : 'Books',
    path : '/shop/listing'
  },
  {
    id : 'watch',
    label : 'Home & Kitchen',
    path : '/shop/listing'
  },


]

 export const filterOptions={
category: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Books", value: "books" },
      { label: "Home & Kitchen", value: "home_kitchen" },
    ],

    brand : [
  { label: "Apple", value: "apple" },            // Electronics
  { label: "Samsung", value: "samsung" },        // Electronics
  { label: "Nike", value: "nike" },              // Clothing
  { label: "Adidas", value: "adidas" },          // Clothing
  { label: "Penguin", value: "penguin" },        // Books
  { label: "HarperCollins", value: "harpercollins" }, // Books
  { label: "Prestige", value: "prestige" },      // Home & Kitchen
  { label: "Philips", value: "philips" },        // Home & Kitchen

],


}

export const sortOptions = [
  { label: "Price: Low to High", value: "price_low_high" },
  { label: "Price: High to Low", value: "price_high_low" },
  { label: "Title: A to Z", value: "title_az" },
  { label: "Title: Z to A", value: "title_za" },
];


export const addressFormElements = [
  {
    name: "fullName",
    type: "text",
    placeholder: "Enter full name",
    required: true,
    label: "Full Name",
    componenttype: "input",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter phone number",
    required: true,
    label: "Phone Number",
    componenttype: "input",
  },
  {
    name: "addressLine1",
    type: "text",
    placeholder: "Enter address line 1",
    required: true,
    label: "Address Line 1",
    componenttype: "input",
  },
  {
    name: "addressLine2",
    type: "text",
    placeholder: "Enter address line 2 (optional)",
    required: false,
    label: "Address Line 2",
    componenttype: "input",
  },
  {
    name: "city",
    type: "text",
    placeholder: "Enter city",
    required: true,
    label: "City",
    componenttype: "input",
  },
  {
    name: "state",
    type: "text",
    placeholder: "Enter state",
    required: true,
    label: "State",
    componenttype: "input",
  },
  {
    name: "postalCode",
    type: "text",
    placeholder: "Enter postal code",
    required: true,
    label: "Postal Code",
    componenttype: "input",
  },
  {
    name: "country",
    type: "text",
    placeholder: "Enter country",
    required: true,
    label: "Country",
    componenttype: "input",
    defaultValue: "India"
  },
  {
    name: "isDefault",
    type: "checkbox",
    required: false,
    label: "Set as default address",
    componenttype: "checkbox",
  }
];

