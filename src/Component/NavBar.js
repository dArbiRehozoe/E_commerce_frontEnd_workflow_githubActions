import '../Styles/SideMenu.css'; // Assurez-vous d'avoir un fichier de styles CSS pour votre menu
import React, { useState ,useEffect} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CustomizedBadges from "./Badje";
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';
// Assurez-vous d'avoir un fichier de styles CSS pour votre menu
import { Link } from 'react-router-dom';
import { useProductsContext } from './MainContext';
const SideMenu = () => {
  const {menucondition,deconnection}=useProductsContext();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user,setUser]=useState([]);
  useEffect(() => {
    const Users= JSON.parse(localStorage.getItem('user'));
    setUser(Users)
    console.log(Users)
 }, []);
    
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    menucondition()
  };
  const [activeLink, setActiveLink] = useState('Acceuil');
  const [activeLinkOver, setActiveLinkOver] = useState(false);
  const [activeLinkHover, setActiveLinkHover] = useState(true);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const handleLinkClickOver = (link) => {
    setActiveLinkOver(!activeLinkOver);
    setActiveLinkHover(link)
  };

  return (
    <div className={`side-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
    
        <img 
          src={require("../photos/logo.jpg")}
          width="40px" height="40px"
          style={{marginLeft:'-10px'}}
          alt="" />
       <div  className='logox'> hehe</div>
        <div className='x'>
        
        <CloseRoundedIcon style={icone}/>

        </div>
      </div>
      <ul style={ulStyle}>
      <h2 style={{fontWeight:'7',paddingLeft:'15px',paddingTop:'5px',display:'flex'}}> .</h2>
      <hr style={{ marginTop: '-15px'}}/>
      <div className='deco1'>
        {
          user.iduser === 1 ? 
        
        <li style={activeLink === 'Dashbord' ? activeLiStyle : liStyle}>
          <Link
            style={linkStyle}
            to='/Dashbord'
            onClick={() => handleLinkClick('Dashbord')}
          >
          <TimelineIcon style={icone}/>
          Dashbord
          </Link>
        </li>
          : <li></li>
        }
        </div>
      <div className='deco1'>
        <li style={activeLink === 'Acceuil' ? activeLiStyle : liStyle}>
          <Link
            style={linkStyle}
            to='/'
            onClick={() => handleLinkClick('Acceuil')}
          >
          <HomeRoundedIcon style={icone}/>
        Acceuil
          </Link>
        </li>
        </div>
        <div  className='deco1'>
        <li style={activeLink === 'update' ? activeLiStyle : liStyle}>
          <Link
            style={linkStyle}
            to='/Produit'
            onClick={() => handleLinkClick('update')}
          >
             <WebRoundedIcon style={icone}/>
            Nos Produits
          </Link>
        </li>
       
        </div>
        <div  className='deco1'>

        <li style={activeLink === 'delete' ? activeLiStyle : liStyle}>
          <Link
            style={linkStyle}
            to='/Historique'
            onClick={() => handleLinkClick('delete')}
          >
          <ReceiptLongRoundedIcon style={icone}/>
           Historique des achats 
          </Link>
        </li>
        </div>
        <div className='deco1'>

        <li style={activeLink === 'add' ? activeLiStyle : liStyle}>
          <Link
            style={linkStyle}
            to='/MonCompte'
            onClick={() => handleLinkClick('add')}
          >
            <AccountCircleRoundedIcon style={icone}/>
            Mon compte
          </Link>
        </li>
        </div>
        <div>
        <li className='deco' style={{position:'absolute',bottom:'10%'}}>
          <Link
            style={linkStyle}
         
            onClick={() =>{
              deconnection()
              window.history.replaceState(null, null, window.location.href)
          
            }
          }
          >
            <LogoutRoundedIcon style={icone}/>
            déconnecter
          </Link>
        </li>
        </div>
      </ul>
      <li   onClick={() => handleLinkClick('')}>

      <CustomizedBadges></CustomizedBadges>
      </li>
    </div>

  );
};

export default SideMenu;
const ulStyle = {
  listStyleType: 'none',
  marginTop: 0,
  padding:10,
  paddingTop: '0em',
  backgroundColor: '#2e0d5c',
  height:'100%',
  borderRadius:"10px"
  //  width: 100px;
  // height: 100px;
  // overflow: hidden; /* Cache tout le contenu qui dépasse */

};

const liStyle = {
  display: 'block',
  color: 'white',
  padding: '1px 2px',
  textDecoration: 'none',
  backgroundColor: 'transparent',
  display:'flex',
  borderRadius:'5px',
  marginTop:'20px',
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
  color: 'white',
  padding: '8px 16px',
  textDecoration: 'none',
 
  width:'100%'
};

const icone={
 
  marginLeft:'-20px',
  marginRight:'10px',
  width:'45px',
//  backgroundColor:'green',

}
const overActif={
  borderRadius:'5px',
  backgroundColor: '#fa8192', // Rouge
  color: 'white',
}
const overDown={
  backgroundColor:'transparent'
}