import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import IconButton from '@mui/material/IconButton';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Styles/SideMenu.css';
function NavScrollCategorie(props) {
    const [activeLink, setActiveLink] = useState('Acceuil');
    const handleLinkClick = (link) => {
      setActiveLink(link);
    };
   
  return (
    <Navbar expand="lg" className="custom-nav " style={{zIndex:'100',position:'fixed',backgroundColor: 'rgba(252,254,253,255)'}}>
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: '#2e0d5c',marginTop:"8px"}}>d'Ashop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
        <li style={activeLink === 'Acceuil' ? activeLiStyle : liStyle}>
          <div className='deco2'>
          <Link
            style={linkStyle}
            to='/Produit'
            onClick={() => handleLinkClick('Acceuil')}
          >
        
        Tout
          </Link>
        </div>  
        </li>
        <li style={activeLink === 'update' ? activeLiStyle : liStyle}>
        <div className='deco2'>
          <Link
            style={linkStyle}
            to="/Produit/Vetement"
            onClick={() => handleLinkClick('update')}
          >
           
           Vêtements et accessoires
          </Link>
          </div>
        </li>
       

        <li style={activeLink === 'delete' ? activeLiStyle : liStyle}>
        <div className='deco2'>
          <Link
            style={linkStyle}
            to="/Produit/Electronique"
            onClick={() => handleLinkClick('delete')}
          >
      
          Électronique 
          </Link>
          </div>
        </li>

        <li style={activeLink === 'add' ? activeLiStyle : liStyle}>
        <div className='deco2'>
          <Link
            style={linkStyle}
            to="/Produit/Maison"
            onClick={() => handleLinkClick('add')}
            >
          
            Maison et jardin
          </Link>
            </div>
        </li>
        <li  style={activeLink === 'Se déconnecter' ? activeLiStyle : liStyle}>
        <div className='deco2'>
          <Link
            style={linkStyle}
            to="/Produit/Sports"
            onClick={() => handleLinkClick('Se déconnecter')}
          >
        
            Sports et loisirs
          </Link>
          </div>
        </li>
      
          </Nav>
          <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  width: 320 }}
      >
        
        <InputBase
          value={props.search}
          onChange={props.handleChangeSearch}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Entrer le nom du produit"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    
      </Paper>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollCategorie;

  const liStyle = {
    display: 'block',
    color: 'black',
    padding: '1px 2px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    display:'flex',
    borderRadius:20,
    marginTop:'8px',
    whiteSpace: 'nowrap', 
    textOverflow: 'ellipsis',
    transition: 'background-color 0.2s, color 0.2s',
    
  };
  
  const activeLiStyle = {
    ...liStyle,
    backgroundColor: '#fa8192', // Rouge
    color: 'white',
  };
  
  const linkStyle = {
  
    display: 'flex',
    color: '#2e0d5c',
    padding: '8px 16px',
    textDecoration: 'none',
   
    width:'100%'
  };
  