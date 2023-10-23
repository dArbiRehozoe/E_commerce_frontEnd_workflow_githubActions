import React, { useState } from "react";
import { useProductsContext } from "./MainContext";
import { Link } from 'react-router-dom';
import MailLockIcon from '@mui/icons-material/MailLock';
import IconButton from '@mui/material/IconButton';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Input from '@mui/material/Input';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../Styles/resetMdp.css'
function ResetMdp() {
  const [formValue, setFormValue] = useState({});
  const {EnvoieCodeMail,Verifie_email}=useProductsContext();
  const [Affichage,setAffichage]=useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [load,setLoad]=useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfPassword, setShowConfPassword] = React.useState(false);

  const handleClickShowConfPassword = () => setShowConfPassword((showConfPassword) => !showConfPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('code', formValue.code); // Supprimez les guillemets autour de formValueAjout.design
    formData.append('email', formValue.email);
    formData.append('new_password', formValue.mdp);

  
    const toutesLesValeurs = {};
  
    // Parcourez les paires clé-valeur de formData et stockez-les dans l'objet
    for (const [clé, valeur] of formData.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    // Maintenant, vous avez toutes les valeurs dans l'objet toutesLesValeurs
    console.log(toutesLesValeurs);
    Verifie_email(toutesLesValeurs);
  };
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (formValue.email.match(emailRegex)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }
  return (
    <div className="contenair">
      <div className="blurr"></div>
      <Link  to='/Login' > 
          <Button style={{margin:'1%',color:'white'}} startIcon={<ArrowBackIosIcon />}  variant="outlined">Se connecter</Button>
      </Link>

      <div className="divform">
      <Link
       
       to='/'
     
     >
            <img 
          className="img"
          src={require("../photos/logo.jpg")}
          width="10%" height="10%"
          alt="" />

          </Link>

        <div className="formm">
   
          {Affichage ?
            <div style={{
              width:'100%',
              margin:'auto',
              
              padding:'10%'
            }} >
              <p>Entrer l'Email lier a votre compte pour vous envoyer une code de recuperation </p>
              <FormControl sx={{ m: 1,marginTop:'5%',width:'100%'}} variant="standard">
                <Input
                  onChange={handleChange}
                  name="email"
                  value={formValue.email || ''}
                  placeholder="Email"       
                  type='text'
                  onBlur={validateEmail}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon /> 
                    </InputAdornment>
                  }
                />
                
              {!isValidEmail && (
        <p style={{ color: 'red' }}>Adresse e-mail non valide</p>
      )}
              </FormControl> 
              <br />
              <LoadingButton
                    loading={load}
                    loadingPosition="end"
                    endIcon={<SendIcon />}
                   
                    variant="contained"
                    disabled={
                      formValue.email===undefined ||formValue.email===""
                      ||
                      !isValidEmail  
                    } 
                    onClick={ (e)=>{
                      setLoad(true)
                      EnvoieCodeMail(formValue.email).then((result) => {
                        if (result === true) {
                          setAffichage(false)
                        }
                        setLoad(false)
                      })
                      .catch((error) => {
                        Swal.fire({
                          icon: 'error',
                          title: "Erreur lors de l'envoie du mail",
                          showConfirmButton: false,
                          timer: 1500
                        })
                   
                        setLoad(false)
                      }); 
                     
                    } }
                    color="secondary"
                    size="medium"
                    sx={{marginTop:'5%',marginLeft:'20%',width: '20ch'}}
                  >
                   Envoyer
              </LoadingButton>
              
                
           
              </div>
          :
            <div style={{ width:'70%',
            margin:'auto',
       
            padding:'10%'}}>
              <Button 
                variant="contained"
                startIcon={<ArrowBackIosIcon />}
                onClick={ (e)=>{ setAffichage(true)}}
                color="secondary"
                size="medium"
                sx={{marginLeft:'-10%'}}
              >
                retour
              </Button> 
              <br />
              <FormControl sx={{ m: 1,marginTop:'5%', width: '30ch' }} variant="standard">
                <Input
                  name="code"
                    onChange={handleChange}
                    value={formValue.code || ''}
                    placeholder="Code de validation"
                    id="standard-adornment-password"
                    type='number'
                    startAdornment={
                      <InputAdornment position="start">
                        <MailLockIcon  /> 
                      </InputAdornment>
                    }
              />
              </FormControl>
              <FormControl sx={{ m: 1,marginTop:'5%', width: '30ch' }} variant="standard">
                  <Input
                    name="mdp"
                    onChange={handleChange}
                    value={formValue.mdp || ''}
                    placeholder="Mots de passe"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    startAdornment={
                        <InputAdornment position="start">
                          
                        <VpnKeyIcon  /> 
                        
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
                  <FormControl sx={{ m: 1,marginTop:'5%',width: '30ch' }} variant="standard">
                    <Input
                      error= {formValue.confirmMdp!=formValue.mdp}
                      value={formValue.confirmMdp|| ''}
                      name="confirmMdp" 
                      onChange={handleChange}
                      placeholder="Confirme mots de passe"
                      id="standard-adornment-password"
                      type={showConfPassword ? 'text' : 'password'}
                      startAdornment={
                        <InputAdornment position="start">
                            <VpnKeyIcon /> 
                        </InputAdornment>
                      }                             
                      endAdornment={
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfPassword}
                            onMouseDown={handleMouseDownPassword}
                           >
                             {showConfPassword ? <VisibilityOff /> : <Visibility />}
                           </IconButton>
                        </InputAdornment>
                      }
                  />
                  </FormControl>
                  <Button 
                      variant="contained"                         
                      disabled={
                        formValue.confirmMdp!=formValue.mdp ||
                        formValue.code===undefined ||
                        formValue.email===undefined ||
                        formValue.mdp ===undefined  
                      } 
                      onClick={handleSubmit}
                      color="secondary"                        
                      size="medium"
                      sx={{marginTop:'5%',width: '34ch',marginBottom:'10%'}}
                  >
                      Réinitialiser 
                  </Button>
                </div>  
    }
    </div>
    </div>
    </div>
  );
}

export default ResetMdp;
const hehe1={
    backgroundColor:'orange' ,
}
const hehe={
    backgroundColor: 'gray',
   with:'7px'
}