import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { ClassNames } from '@emotion/react';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider } from "@mui/styles";
import { createContext } from 'react';
import { Link, useLocation } from "react-router-dom"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import logo from '../../assets/ecommerce.png';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Navbar = ({ totalItems, cart }) => {
    const classes = useStyles();
    const location = useLocation();
   

 

  return (
    <>
        <AppBar position="fixed" className={classes.AppBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant='h6' className={classes.title} color="inherit">
                    <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                    E-shop Posters
                </Typography>
                <div className={classes.grow}/>
              {location.pathname === '/' &&  (<div className={classes.button}>
                    <IconButton component={Link} to="./cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart/>

                        </Badge>
                    </IconButton>
                </div>)}
               
            </Toolbar>

        </AppBar>
    </>
  )
}

export default Navbar