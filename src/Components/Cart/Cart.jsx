import React from 'react';
import { Container, Typography, Button, Grid, CircularProgress } from "@mui/material";
import { ClassNames } from '@emotion/react';
import "../utils/dotAnimation/styles.css";
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import { Link } from "react-router-dom"


const Cart = ({ cart, BouncingDotsLoader, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    // const isEmpty = !cart.total_items;
    // const isEmpty2 = async () => {
    //     const truth = await cart.total_items;
    //     return truth
    // }
    // console.log(isEmpty2());
    
    
    
  

    // const lol = () => {
    //     if(isEmpty() === undefined){
    //         return console.log("Loading")
    //     }else if(isEmpty() === 0){
    //         return console.log("Empty")
    //     }else if(isEmpty() > 0){
    //         return console.log("Good")
    //     }else{
    //         console.log("error")
    //     }
    // };
    // lol()


    const classes = useStyles();
    const EmptyCart = () => (
        <Typography variant='subtitle1'>You have no items in your shopping cart,
        <Link to='/' className={classes.link}> start adding some</Link>!
        </Typography>
    )
    const UndefCart = () => (
        <div><Typography variant='subtitle1'></Typography>
        <CircularProgress/>
        </div>
    )

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id} >
                    <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'> Subtotal: { cart.subtotal.formatted_with_symbol }</Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>
        </div>
        </>
    )    
   
    
    
    // const choice = () => {
    //     isEmpty2().then(function(value){
    //         if(value === undefined){
    //             <EmptyCart /> 
    //         }else if(value === 0){
    //              <EmptyCart /> 
    //         }else if(value > 0){
    //             <FilledCart />
    //         }else{
    //                     console.log("error")
    //                 }
    //     }
    //      )
    // }
    const choice = () => {
        if(cart.total_items === undefined){
            return <UndefCart /> 
        }else if(cart.total_items === 0){
            return <EmptyCart /> 
                }else if(cart.total_items> 0){
            return <FilledCart />
                }else{
                            console.log("error")
                        }
    }
    
  return (
    
    <Container>
        <div className={ClassNames.toolbar}/>
        <Typography className={ClassNames.title} variant="h3" gutterBottom m={2} pt={7}>Your Shopping Cart</Typography>
        
        {choice()}
        
    </Container>
  )
}

export default Cart

