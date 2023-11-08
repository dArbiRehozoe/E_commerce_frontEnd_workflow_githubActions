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
import '../Styles/register.css'
import { right } from "@popperjs/core";
function Register() {
  const [formValue, setFormValue] = useState({});
  const {Register}=useProductsContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfPassword, setShowConfPassword] = React.useState(false);

  const handleClickShowConfPassword = () => setShowConfPassword((showConfPassword) => !showConfPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (formValue.email.match(emailRegex)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('username', formValue.pseudo); // Supprimez les guillemets autour de formValueAjout.design
    formData.append('email', formValue.email);
    formData.append('password', formValue.mdp);

  
    const toutesLesValeurs = {};
  
    // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
    for (const [clé, valeur] of formData.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    // Maintenant, vous avez toutes les valeurs dans l'objet toutesLesValeurs
    console.log(toutesLesValeurs);
    Register(toutesLesValeurs);
  };
 
  return (
    <div className="divMere">
      <div className="blur">  
      </div>
      <div className="contenaire">  
        <div className="divinput">
          <div className="form">
            <div  style={{display:'flex'}}>
              <div
                style={{
                  position:'absolute',
                  height:'100%',
                  width:'100%',
                  display:'flex',
                  right:'3%',
                  top:'10px'
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
              <h4 style={{marginTop:'15px',marginLeft:'10px',position:'absolute',color:'white'}}>S'inscrire a d'Ashop</h4>
             </div>
            <br />
            <FormControl sx={{ m: 1,marginTop:'7%', width: '30ch' }} variant="standard">
              <Input
                onChange={handleChange}
                value={formValue.pseudo || ''}
                name="pseudo"
                placeholder="Pseudo"
                style={{color:'white'}}
                type='text'
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle   sx={{color:'white'}}/>                     
                      </InputAdornment>
                    }
                  />
                  </FormControl>
          
                 
                 <br />
                  <FormControl sx={{ m: 1,marginTop:'2%', width: '30ch' }} variant="standard">
                    <Input
                      style={{color:'white'}}
                    onChange={handleChange}
                    name="email"
                    value={formValue.email || ''}
                    placeholder="Email"
                    onBlur={validateEmail}
                    type='email'
                    startAdornment={
                        <InputAdornment position="start">
                          
                        <EmailIcon sx={{color:'white'}} /> 
                     
                        </InputAdornment>
                      }
                  
                    />
                  </FormControl>
            
                  {!isValidEmail && (   <>   <br />
        <b style={{ color: 'red' }}>Adresse e-mail non valide</b> </>
      )}
      <br />
     
                  <FormControl sx={{ m: 1,marginTop:'2%', width: '30ch' }} variant="standard">
                    <Input
                    name="mdp"
                    onChange={handleChange}
                        style={{color:'white'}}
                    value={formValue.mdp || ''}
                    placeholder="Mots de passe"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                        <InputAdornment position="start">
                          
                        <VpnKeyIcon sx={{color:'white'}} /> 
                        
                        </InputAdornment>
                      }
                      endAdornment={
                        
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff  sx={{color:'white'}}/> : <Visibility  sx={{color:'white'}}/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <br />
                  <FormControl sx={{ m: 1,marginTop:'2%',width: '30ch' }} variant="standard">
                            <Input
                          error= {formValue.confirmMdp!=formValue.mdp}
                          
                          
                          value={formValue.confirmMdp|| ''}
                            name="confirmMdp" 
                            onChange={handleChange}
                            style={{color:'white'}}
                            placeholder="Confirme mots de passe"
                              id="standard-adornment-password"
                              type={showConfPassword ? 'text' : 'password'}
                              startAdornment={
                                <InputAdornment position="start">
                                
                                 
                                    <VpnKeyIcon sx={{color:'white'}}/> 
                             
                                </InputAdornment>
                              }
                              endAdornment={
                                <InputAdornment position="start">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {showConfPassword ? <VisibilityOff sx={{color:'white'}} /> : <Visibility sx={{color:'white'}} />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                  </FormControl>
                  <br />
                  <Button 
                    variant="contained"
                    disabled={
                      formValue.confirmMdp!==formValue.mdp ||
                      formValue.pseudo===undefined||
                      formValue.email===undefined ||
                      formValue.mdp ===undefined ||
                      formValue.pseudo==="" ||
                      formValue.email==="" ||
                      formValue.mdp ===""  ||
                      !isValidEmail  
                    } 
                    color="secondary"
                    onClick={handleSubmit}
                    size="medium"
                    sx={{marginTop:'3%',width: '34ch'}}
                  >
                    S'inscrire
                  </Button> 
                  <br />
                  <FormControl   sx={{color:'white',marginTop:'2%',display:'flex'}}>
                <p>  Vous avez deja un compte?  <Link to='/login'>
                    Se connecter
         </Link></p>
                    </FormControl>
                  
            </div>
        </div>
      
      </div>
    </div>
  );
}

export default Register;
const hehe1={
    backgroundColor:'orange' ,
}
const hehe={
    backgroundColor: 'gray',
   with:'7px'
}