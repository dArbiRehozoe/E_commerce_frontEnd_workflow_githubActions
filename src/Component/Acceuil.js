import '../App.css';

import { useProductsContext } from './MainContext';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import ButtonAppBar from './NavAcceuil';
import DarkVariantExample from './slideAcceuil';
import FacebookIcon from '@mui/icons-material/Facebook';
import TitlebarBelowMasonryImageList from './Imagelist';
import '../Styles/Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState,useEffect } from 'react';
function Acceuil() {
    const {ProductA}=useProductsContext();
    console.log(ProductA)
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
    <div id="zone de livraison">
       { user.length === 0 ?
          <ButtonAppBar></ButtonAppBar>
      : <div style={{marginTop:'40px'}}></div>
      }
    <div  className='page' style={{width:'80%',margin:'auto'}}>
    
        
      <DarkVariantExample></DarkVariantExample>
   
      <h5 style={{marginBottom:'-10px',marginTop:'20px',color:'#2e0d5c'}}>Zone de Livraison</h5>
      <hr />
      <div style={{height:'260px',width:'80%',margin:'auto',backgroundColor:'#2e0d5c'}}>
      <img
  
          className="d-block w-100"
          src={require("../photos/monde.jpg")}
          alt="Second slide"
          style={{
            height:"100%",
            }}
         
        />
      </div>
      <h5 id="produit" style={{marginBottom:'-10px',marginTop:'20px',color:'#2e0d5c'}}>Nos recent produit</h5>
      <hr />
      <TitlebarBelowMasonryImageList Products={ProductA}></TitlebarBelowMasonryImageList>
      <h5 style={{marginBottom:'-10px',marginTop:'20px',color:'#2e0d5c'}}>A propos de nous</h5>

      <hr />
      <div className="roww">
        <div className="columnn" style={{backgroundColor:"rgba(220, 220, 220, 0.418)"}}>
        <div className="widget subscribe no-box">
<h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>d'Ashop
</h5>
<p>Notre passion pour la qualité et le 
   client exceptionnel nous a guidés dans la création de d'Ashop. Depuis 2021, 
    nous nous sommes engagés à vous offrir les produits les plus 
  innovants et les plus tendance, tout en garantissant une expérience de 
  magasinage en ligne sans pareille. Chez  d'Ashop,
   nous croyons que chaque achat devrait être une expérience mémorable,
    et c'est pourquoi nous travaillons sans relâche pour vous apporter
     une sélection soigneusement choisie, un service client attentif et 
     des prix compétitifs. Merci de nous faire confiance pour répondre 
     à tous vos besoins  </p>
</div>
        </div>
        <div className="columnn" style={{backgroundColor:"rgba(220, 220, 220, 0.418)"}}>
        <img
          className="d-block w-100"
          src={require("../photos/map.jpg")}
          alt="First slide"
          style={{
          height:"100%"
          }}
       
        />
        </div>
      </div>
      <div className='divcolumnn' style={{backgroundColor:'transparent'}}></div>

    </div>

    <footer id="footer" className="footer-1">
    
<div className="main-footer widgets-dark typo-light">
<div className="container">
<div className="row">
  
<div className="col-xs-12 col-sm-6 col-md-5">
<div className="widget subscribe no-box">
<h5 className="widget-title" style={{color:'#2e0d5c'}}>
<img 
          src={require("../photos/logo.jpg")}
          width="50px" height="50px"
          alt="" />
  d'Ashop<span></span></h5>
<p>
 Nous vous remercions d'avoir visiter notre site,Vous pouvez nous concater via les liens ci-coté
</p>
</div>
</div>

<div className="col-xs-12 col-sm-6 col-md-4">

<div className="widget no-box">
<h5 className="widget-title">Contacter nous<span></span></h5>

<p > <b style={{color:'purple'}}>Gmail:</b>  rehozoedarbi@gmail.com</p>
<p > <b style={{color:'purple'}}>Télephone:</b> 0331976365 </p>
<ul className="social-footer2">
<li className=""><a title="youtube" target="_blank" href="https://bit.ly/3m9avif">
<GitHubIcon /> 
</a></li>
<li className=""><a href="https://www.facebook.com/" target="_blank" title="Facebook">
<FacebookIcon /> 
</a></li>
<li className=""><a href="https://twitter.com" target="_blank" title="Twitter">
<LinkedInIcon /> 
</a></li>
<li className=""><a title="instagram" target="_blank" href="https://www.instagram.com/">
<InstagramIcon /> 
</a></li>
</ul>
</div>
</div>


<div className="col-xs-12 col-sm-6 col-md-3">
<div className="widget no-box">
<h5 className="widget-title">Liens<span></span></h5>
<ul className="thumbnail-widget">
<li>
<div className="thumb-content"><a href="#zone de livraison">Zone de Livraison</a></div> 
</li>
<li>
<div className="thumb-content"><a href="#produit">Nos produits</a></div> 
</li>
{ user.length !== 0 ?
         
      <div ></div>:
      <div>
      <li>
<div className="thumb-content">  <Link
 
 to='/Login'

>
 
S'inscrire
    </Link>
</div> 
</li>

<li>
<div className="thumb-content">
<Link
 
 to='/Register'

>
  Se connnecter

    </Link>

</div> 
</li>
    </div>
      }

</ul>
</div>
</div>

</div>
</div>
</div>
  
<div className="footer-copyright">
<div className="container">
<div className="row">
<div className="col-md-12 text-center">
<p>Copyright d'Ashop  © 2023.</p>
</div>
</div>
</div>
</div>
</footer>
    {/* <Routeur/> */}
      {/* <Link  to='/Panier'>Panier</Link>
      <Link  to='/'>Produit</Link>
      <Link  to='/Historique'>Historique</Link>
      <Link  to='/Register'>Register</Link>
      <Link  to='/Login'>Login</Link>
      <Link  to='/MonCompte'>MonCompte</Link>
      <Link  to='/Reset_passwork'>Mdp oublier</Link> */}


  </div>
  );
}

export default Acceuil;
