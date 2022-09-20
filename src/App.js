import React, { useState, useEffect } from 'react';
import { red } from '@mui/material/colors';
import {  createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { commerce } from './lib/commerce';
import "./Components/utils/dotAnimation/styles.css";
import { Products, Navbar, Cart, BouncingDotsLoader, Checkout } from './Components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


let theme = createTheme({
  palette: {
    // primary: {
      
    //   main: yellow[500]
    // },
    secondary: {
      light: '#ffffff',
      main: red[500],
      dark: "#b71c1c",
      contrastText: '#ffffff'
    // },
    // typography: {
    //   allVariants: {
    //     color:"#ffffff"
    //   }
    },
  },
});
theme = responsiveFontSizes(theme);

const App = () => {
 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})
 
  const [order, setOrder] = useState({})
  const [total, setTotal] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };  

  const fetchCart = async () => {
    /* const cart = await commerce.cart.retrieve();

    setCart(cart) */
    setCart(await commerce.cart.retrieve())
  }
  
  const handleAddToCart = async (productId, quantity) => {
    const { cart }  = await commerce.cart.add(productId, quantity);

    setCart(cart)
   // window.location.reload();
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});
    setCart(cart);
    window.location.reload();
  }

  const handleRemoveFromCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart);
    window.location.reload();
  }

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();
    setCart(cart);
    
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
     refreshCart();

    }catch(error) {
      setErrorMessage(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
    
  }, []);
  
  


  
  useEffect(() => {

    const getTotalItems = async () => {
      const total = await cart.total_items
      console.log(commerce.cart)
      setTotal(total)
    }

    getTotalItems();
    
  }, [cart]);

  console.log(total)
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Navbar totalItems={cart ? total : window.location.reload()} cart={cart} /> 

    <Routes>
    
    <Route exact path="/" element= { <Products products={products} onAddToCart={handleAddToCart}/>  }>
    </Route>

    <Route exact path="/cart" refresh='true' element={  <Cart 
                                              cart={cart} 
                                              BouncingDotsLoader={BouncingDotsLoader}
                                              handleUpdateCartQty={handleUpdateCartQty}
                                              handleRemoveFromCart={handleRemoveFromCart}
                                              handleEmptyCart={handleEmptyCart}
                                            /> }>
    </Route >
    <Route exact path="/checkout" element= {<Checkout 
                                                cart={cart}
                                                order={order}
                                                onCaptureCheckout={handleCaptureCheckout}
                                                error={errorMessage}
                                             />}>

    </Route>
    </Routes>
    
    
  </Router>  
  </ThemeProvider>
  )
}

export default App;