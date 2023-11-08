
import {
  Route,
} from "react-router-dom";
import { ProductsProvider, useProductsContext } from './MainContext';
import { BrowserRouter, Routes} from 'react-router-dom';
import Listproduct from './products';
import Panier from './Panier';
import { Link } from 'react-router-dom';
import Historique from './Historique';
import Register from './register';
import { useState,useEffect } from 'react';
import Login from './login';
import ResetMdp from './ResetMdp';
import CompteUser from './CompteUser';
import Navbar from "./NavBar";
import MonPanier from "./Panier";
import CustomizedBadges from "./Badje";
import Acceuil from "./Acceuil";
import Dashbord from "./Dashbord";
import Parallaxe from "./Parallax.tsx";
import { useMediaQuery } from 'react-responsive';
function Routeur() {
    const {Products,Maisons,Vetements,Sports,menu,Electroniques}=useProductsContext()
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const isLargeScreen = useMediaQuery({ minWidth: 769 });
    const [user,setUser]=useState([]);
    useEffect(() => {
      const Users= JSON.parse(localStorage.getItem('user'));
      if (Users !== null && typeof Users === 'object' && 'iduser' in Users) {
        // Accédez à la propriété 'iduser' ici
        setUser(Users)
      }else{
       setUser([])
      }
      console.log(Users)
   }, []);
      
  return (
    <div>
      <div style={{marginRight:'100px'}}>
      { user.length !== 0 ?
           <Navbar> </Navbar>
      : <div ></div>
      }
       
          
      </div>
    
      <Routes>
        <Route path="/" >
        <Route index element={
          <div style={menu? menuAtrue:menuAfalse}>
           
          <Parallaxe ></Parallaxe>

          </div>
          
        }/>
        <Route path="/Produit" element={
          <div style={menu? menutrue:menufalse}>
           <Listproduct Products={Products}></Listproduct>
           </div>
          }
         />
        <Route path="/Produit/Maison" element={ 
           <div style={menu? menutrue:menufalse}>
           <Listproduct Products={Maisons}></Listproduct>
           </div>}
        />
        <Route path="/Produit/Vetement" element={ 
 <div style={menu? menutrue:menufalse}>
   <Listproduct Products={Vetements}></Listproduct>
 </div>
      } />
        <Route path="/Produit/Sports" element={
           <div style={menu? menutrue:menufalse}>
             <Listproduct Products={Sports}></Listproduct>
           </div>
        
        } />
        <Route path="/Produit/Electronique" element={
           <div style={menu? menutrue:menufalse}>
             <Listproduct Products={Electroniques}
             ></Listproduct>
           </div>
           } />
        <Route path="/Historique" element={
           <div style={menu? menutrue:menufalse}>
             <Historique/>
           </div>
      }
         />
        <Route path="/Dashbord" element={
           <div style={menu? menutrue:menufalse}>
             <Dashbord/>
           </div>
        } />
        <Route path="/Panier" element={
         <div style={menu? menutrue:menufalse}>
           <Panier/>
         </div>
        } />
        <Route path="/Register" element={
          
             <Register/>
        
        } />
        <Route path="/Login" element={
       
             <Login/>
          
        } />
        <Route path="/Reset_passwork" element={
          
             <ResetMdp/>
        
        } />
        <Route path="/MonCompte" element={
         <div style={menu? menuComptetrue:menuComptefalse}>
           <CompteUser/>
         </div>
        } />
      
        </Route>
      </Routes>
    
      </div>
  );
}

export default Routeur;
const menutrue={
  overflow:'hidden',marginLeft:'21%'
}
const menufalse={
  overflow:'hidden',marginLeft:'15%'
}
const menuComptetrue={
  overflow:'hidden',marginLeft:'10%'
}
const menuComptefalse={
overflowY:'hidden',marginLeft:'0%'
}
const menuAtrue={
  width:'50%',
  backgroundColor:'red',
  overflow:'hidden',marginLeft:'0%'
}
const menuAfalse={
  width:'200px',
  backgroundColor:'red',
  overflow:'hidden',marginLeft:'0%'
}