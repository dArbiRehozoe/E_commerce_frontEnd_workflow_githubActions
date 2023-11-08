import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery } from 'react-responsive';
import '../Styles/parallax.css'
import { Link } from 'react-router-dom';
export default function ButtonAppBar() {
  const isSmallScreen = useMediaQuery({ maxWidth: 600 });
  return (
    <Box className='page' sx={{ flexGrow: 1}}>
      <AppBar position="fixed" style={{backgroundColor:'rgba(252,254,253,255)'}}>
        <Toolbar >
             <img 
          src={require("../photos/logo.jpg")}
          width="50px" height="50px"
          alt="" />
          {!isSmallScreen ? 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:'#2e0d5c'}}>
         
           d'Ashop
          </Typography>
          : <p style={{marginLeft:'20%'}}></p> }
          <Link
       
       to='/Login'
     
     >
          <Button  color="secondary"
           variant="outlined"
           sx={{width:'120px',borderRadius:20,right:'10%',textTransform:'unset'}}
           > 
          Se connecter
          </Button>
          </Link>
          <Link
       style={{color:'white'}}
       to='/Register'
     
     >
   <Button color="inherit"  sx={{width:'100px', backgroundColor:'#2e0d5c',borderRadius:20,textTransform:'unset'}}> 
          {/* <AccountCircle /> */}
        S'inscrire
          </Button>
          </Link>
        </Toolbar>
      
      </AppBar>
   
    </Box>
  );
}