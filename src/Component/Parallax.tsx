import React, { useRef } from 'react'
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Button from 'react-bootstrap/esm/Button'
import ButtonAppBar from './NavAcceuil'
import Text from './textAnnimation'
import WordAnimation from './AffichageText'
import '../Styles/parallax.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TitlebarBelowMasonryImageList from './Imagelist';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Carrousel from './transition'
import { useState,useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
// Little helpers ...
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function Parallaxe() {
      const [user,setUser]=useState([]);
      const isSmallScreen = useMediaQuery({ maxWidth: 600 });
    
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
  const parallax = useRef<IParallax>(null!)
  const text="Trouvez tout ce que vous désirez chez nous: votre destination shopping ultime pour des choix  exquis et une expérience inoubliable!"
  
  return (
    <div style={{ width: '100%', height: '100%', background: 'white' }}>
      <Parallax ref={parallax} pages={!isSmallScreen ? 3 : 3.5 }
     style={{backgroundColor:'#013c74'}}
      >
     <p></p>
     { user.length === 0 ?
          <ButtonAppBar></ButtonAppBar>
      : <div style={{marginTop:'0px'}}></div>
      }
  
     
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#413d72' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#2672b6' }} />
     
        <ParallaxLayer style={{marginTop:'120px'}}> 
    
        <div className='block'>
          <div className='gauche'>
            <div className='Titre'>
             <WordAnimation/>
             <div>
  
    </div>
            </div>
            <div className='text'>
            <Text value={text}/>
            </div>
          </div>
          <div className='droite'>
            <div>
              <div className='Acceuil1'>
                <img  src={require("../photos/photo1.jpg")} alt="" width="100%" height="100%"/>   
                  
              </div>
              <div className='Acceuil2'>
                <img  src={require("../photos/logo2.jpg")} alt="" width="100%" height="100%"/>         
              </div>  
            </div>
            <div style={{marginLeft:'-10%'}}>
              <div className='Acceuil2'>
                <img  src={require("../photos/logo1.jpg")} alt="" width="100%" height="100%"/>         
              </div>
              <div className='Acceuil1'>
                <img  src={require("../photos/logo5.jpg")} alt="" width="100%" height="100%"/>         
              </div>  
            </div>
          </div>
          
        </div>
        
       </ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} >

        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
         
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0}
          style={{
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
           
           
          }}>
            
            <h3 style={{marginBottom:'-10px',textDecoration:'underline',marginTop:'20px',color:'white',textAlign:'center'}}>A propos de nous</h3>

<div className="roww">

<div className="columnn" style={{backgroundColor:"rgba(220, 220, 220, 0.418)"}}>
<div className="widget subscribe no-box">
<h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>d'Ashop
</h5>

<Text value="Notre passion pour la qualité et le 
client exceptionnel nous a guidés dans la création de d'Ashop. Depuis 2021, 
nous nous sommes engagés à vous offrir les produits les plus 
innovants et les plus tendance, tout en garantissant une expérience de 
magasinage en ligne sans pareille. Chez  d'Ashop,
nous croyons que chaque achat devrait être une expérience mémorable,
et c'est pourquoi nous travaillons sans relâche pour vous apporter
une sélection soigneusement choisie, un service client attentif et 
des prix compétitifs. Merci de nous faire confiance pour répondre 
à tous vos besoins"/>

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
    
          
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
         
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
        //  onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
         
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0}
        //  onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Carrousel />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: !isSmallScreen ?   'block' :  'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: !isSmallScreen ?  '530px' :  '600px' 
        
          }}
          // onClick={() => parallax.current.scrollTo(0)}
          >
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
    <div className="col-md-3 text-center" >
    <p style={{marginTop:'-70px',float:'left'}}>Copyright d'Ashop  © 2023.</p>
    </div>
    </div>
    </div>
    </div>
    </footer>
        
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
