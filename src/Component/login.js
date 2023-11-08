import React, { useState } from "react";
import { useProductsContext } from "./MainContext";

import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../Styles/login.css'
function Login() {
  const [formValue, setFormValue] = useState({});
  const {Login}=useProductsContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('identifier', formValue.pseudo); 
    formData.append('password', formValue.mdp);

  
    const toutesLesValeurs = {};
  
    // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
    for (const [clé, valeur] of formData.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    // Maintenant, vous avez toutes les valeurs dans l'objet toutesLesValeurs
    console.log(toutesLesValeurs);
    Login(toutesLesValeurs);
  };
 
  return (

       <div className="divMere">
    <div className="blurlogin">
      
    </div>
      <div className="contenairelogin">
        <div className="blurtestlogin"></div>
        <div className="divinputlogin">
        <div 
                style={{
                  position:'absolute',
                  height:'100%',
                  width:'100%',
                  display:'flex',
                  left:'60px',
                  top:'20px'
                }}
              >
                <Link to='/'>
                  <img 
                    src={require("../photos/logo.jpg")}
                    width="100%" height="10%"
                    style={{borderRadius:'100%'}}
                    alt=""
                  />
                </Link>
              </div>
          <br />
              <h4 style={{marginTop:'45px',marginLeft:'50px',color:'white'}}>Se connecter a d'Ashop</h4>
  
            <div className="form">
                  <FormControl sx={{ m: 1,marginTop:'10%', width: '30ch' }} variant="standard">
                    <Input
                  style={{color:'white'}}
                    onChange={handleChange}
                    value={formValue.pseudo || ''}
                    name="pseudo"
                    placeholder="Pseudo ou adresse email"
                  
                    type='text'
                    startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle   sx={{color:'white'}} />                     
                        </InputAdornment>
                      }
                  
                    />
                  </FormControl>
                 
                <br />
                  <FormControl sx={{ m: 1,marginTop:'8%', width: '30ch' }} variant="standard">
                    <Input
                    name="mdp"
                    style={{color:'white'}}
                    onChange={handleChange}
                    value={formValue.mdp || ''}
                    placeholder="Mots de passe"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                        <InputAdornment position="start">
                          
                        <VpnKeyIcon   sx={{color:'white'}}/> 
                        
                        </InputAdornment>
                      }
                      endAdornment={
                        
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff sx={{color:'white'}}/> : <Visibility sx={{color:'white'}}/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <br />
                <br />
                <div style={{display:'flex',width:'150%'}}>
                <Link  to='/Register'> 
                  <Button  variant="outlined" sx={{textTransform:'unset',backgroundColor:'#003465',color:'white'}}>S'inscrire</Button>
                  </Link>
                  <Button 
                    variant="contained"
                    disabled={
                      formValue.pseudo===undefined||
                      formValue.mdp ===undefined ||
                      formValue.pseudo==="" ||
                      formValue.mdp ===""    
                    } 
                    color="secondary"
                    onClick={handleSubmit}
                    size="medium"
                    sx={{marginLeft:'20%',textTransform:'unset'}}
                  >
                <span style={{ whiteSpace: 'nowrap' }}>Se connecter</span>
                  </Button> 
                  </div>
                  <br />
                  <p>
                    <Link  to='/Reset_passwork' style={{color:'white',marginLeft:'45px'}}>Mots de passe oublier? </Link>
                  </p>
            </div>
        </div>
     
      </div>
    </div>
  
  );
}

export default Login;
