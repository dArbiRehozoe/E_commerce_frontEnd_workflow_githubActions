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
        
        <div className="divinput">
        <Link
       
       to='/'
     
     >
           <img 
          src={require("../photos/logo.jpg")}
          width="10%" height="10%"
          alt="" />

          </Link>
  
            <div className="form">
                  <FormControl sx={{ m: 1,marginTop:'10%', width: '30ch' }} variant="standard">
                    <Input
                  
                    onChange={handleChange}
                    value={formValue.pseudo || ''}
                    name="pseudo"
                    placeholder="Pseudo ou adresse email"
                  
                    type='text'
                    startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />                     
                        </InputAdornment>
                      }
                  
                    />
                  </FormControl>
                 
                
                  <FormControl sx={{ m: 1,marginTop:'8%', width: '30ch' }} variant="standard">
                    <Input
                    name="mdp"
                    onChange={handleChange}
                    value={formValue.mdp || ''}
                    placeholder="Mots de passe"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                        <InputAdornment position="start">
                          
                        <VpnKeyIcon /> 
                        
                        </InputAdornment>
                      }
                      endAdornment={
                        
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <br />
                <br />
                <div style={{display:'flex',width:'150%'}}>
                <Link  to='/Register'> 
                  <Button variant="outlined">s'inscrire</Button>
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
                    sx={{marginLeft:'8%'}}
                  >
                <span style={{ whiteSpace: 'nowrap' }}>se connecter</span>
                  </Button> 
                  </div>
                  <p>
                    <Link  to='/Reset_passwork'>Mots de passe oublier? </Link>
                  </p>
            </div>
        </div>
        <div className="image">
          <img 
          src={require("../photos/Ecommerce Website Development _ B2B_B2C Ecommerce Solutions (1).jpg")}
          width="100%" height="100%"
          alt="" />
        </div>
      </div>
    </div>
  
  );
}

export default Login;
