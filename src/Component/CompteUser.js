import React, { useState,useEffect } from "react";
import { useProductsContext } from "./MainContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Input from '@mui/material/Input';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
function CompteUser() {

  const [formValue, setFormValue] = useState({});
  const [avat,setavat]=useState()
  const [enablePseudo,setenablePseudo]=useState(true)
  const [enableMail,setenableMail]=useState(true)
  const handleInputFocus = () => {
    setenablePseudo(!enablePseudo);
    console.log(enablePseudo)
  };
  const handleInputFocusMail = () => {
    setenableMail(!enableMail);
    console.log(enableMail)
  };
  useEffect(() => {
   const Users= JSON.parse(localStorage.getItem('user'));
    setFormValue({
   
        'pseudo': Users.username,
        'email' :Users.email
  
    })
    setavat(Users.username[0])
}, []);
  const {user,change_email,change_username,deconnection,deleteUser,reset_password}=useProductsContext();
  const [open,setOpen]=useState(false)
 
  const handleClose =()=>{
  
    setOpen(false)
  }
  console.log(formValue)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  
  };
  const handleSubmit = async (e) => {
    const data={
      'newpassword':formValue.newpassword,
      'oldpassword':formValue.oldpassword,
      'iduser':user.iduser
    }
    console.log(data);
    reset_password(data)
  };

  return (
    <div className="compteResposive" style={{overflow:'hidden',}}>
      <div className="backgroundcompte"></div>
    <h3 style={{textAlign:'center',color:'white',marginTop:'4%' ,textDecoration:'underline'}}>Mes informations personnel :</h3>
    <div style={{marginTop:'4%',zIndex:1000}}>
      <div style={{margin:"auto",maxWidth: 505,zIndex:1000}}>

     
      <Card sx={{ maxWidth: 505, m: 2,backgroundColor:'white',zIndex:1000}}>
      <CardHeader
        avatar={
          (
           
              
            <Avatar sx={{ width: 150, height:150,fontSize: '60px',backgroundColor:'#3c83c4'}}>
            {avat}
              </Avatar>
           
           
          )
        }
     
    
        subheader={ <div  >
          <b style={{fontSize:'20px',color:'#c34a91'}}   onClick={handleInputFocus}> Pseudo:</b>
         <br />
            <Input 
               disabled={enablePseudo}
             
            onChange={handleChange}
            value={formValue.pseudo || '' }
            inputProps="description" 
            type="text" name="pseudo" id="" 
            sx={{width:'50%',marginTop:'2%'}}
            />
            
        
          </div>}
        action={
        enablePseudo ? 
        <IconButton aria-label="settings" 
          
        style={{marginTop:'170%',color:'pink',marginLeft:'-50%'}} 
           onClick={()=>{
            setenablePseudo(false)
           }}
           >
             <DriveFileRenameOutlineRoundedIcon />
           </IconButton> :
            <IconButton aria-label="settings"  
            disabled={enablePseudo}
             style={{marginTop:'170%',color:'blue',marginLeft:'-50%'}} 
             onClick={()=>{
              change_username(formValue.pseudo)
              setavat(formValue.pseudo[0])
              setenablePseudo(true)
            }}>
              <DriveFileRenameOutlineRoundedIcon  />
            </IconButton>
            
            
          
        }
    
      />
     <hr />
      <CardContent sx={{marginLeft:'7%'}}>
       
       <Typography variant="body2" color="text.secondary" component="p">
         {
           <div >
               <b style={{fontSize:'17px',color:'#c34a91'}} onClick={handleInputFocusMail}>Adresse Email:</b>
               <br />
             <Input 
            disabled={enableMail}    
            onChange={handleChange}
            inputProps="description" 
            type="email" name="email" id="" 
            value={formValue.email || ''}
            sx={{width:'70%',marginTop:'2%'}}
            />

       {
         enableMail ?
         <IconButton aria-label="settings" 
          
           style={{float:'right',marginRight:'10px',color:'pink',marginTop:'10px'}} 
            onClick={()=>{
             setenableMail(false)
            }}
            >
              <DriveFileRenameOutlineRoundedIcon />
            </IconButton>
            :
         <IconButton aria-label="settings" 
         disabled={enableMail} 
       style={{float:'right',marginRight:'10px',color:'blue',marginTop:'10px'}} 
        onClick={()=>{
          change_email(formValue.email)
          setenableMail(true)
        }}
        >
          <DriveFileRenameOutlineRoundedIcon />
        </IconButton>
        
        
       }
          </div>
         }
       </Typography>
   
   </CardContent>

      <CardContent sx={{marginLeft:'7%',marginBottom:'10%'}}>
       
          <Typography variant="body2" color="text.secondary" component="p">
            
            {
             <div >
                <b style={{fontSize:'17px',color:'#c34a91'}}> Mots de passe:</b>
                <br />
                 <Input 
            disabled    
            onChange={handleChange}
            inputProps="description" 
            value={formValue.mdp || user.password}
            type="password" name="mdp" id="" 
            sx={{width:'70%',marginTop:'2%'}}
            />
              
<IconButton aria-label="settings"  style={{float:'right',marginRight:'10px',marginTop:'10px',color:'pink'}} 
             onClick={()=>setOpen(true)}
            >
              <DriveFileRenameOutlineRoundedIcon />
            </IconButton>
  
             </div>
            }
          </Typography>
      
      </CardContent>

    </Card>
    </div>
   
      <Dialog
          open={open}
          sx={{
            backdropFilter: "blur(5px)",
            opacity:1,
          }}
          PaperProps={{ sx: { width: "100%",   overflowY:"hidden" } }}
        
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><h3 style={{textAlign:'center'}}>Modifier mon mots de passe </h3></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <div className='divi'> 
              <form className="publier">   
                  <div style={{marginTop:'0px',fontWeight:"800"}}>
                  <TextField
                   multiline
                   name='oldpassword'
                   label="Ancien Mots de passe"
                    type="text" 
                    id="outlined-multiline-flexible"
                    maxRows={4}
                    style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
                    value={formValue.oldpassword || ''}
                    onChange={handleChange}
                  />
                  </div> 
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
                  </div> 
       
           <div> 
           <TextField
                id="outlined-multiline-flexible"
                name='newpassword'
                label="Nouveau Mots de passe"
                type="text" // Modifiez le type de 'text' à 'number'
                maxRows={4}
                max={100}
                style={{width: "65%", marginLeft:'18%', marginTop:'20px'}}
                value={formValue.newpassword || ''}
                onChange={handleChange}
          />
          </div> 
          <TextField
           multiline
           name='confirmPassword'
           label="Confirme Mots de passe"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
       
            value={formValue.confirmPassword || ''}
            onChange={handleChange}
            style={formValue.newpassword===formValue.confirmPassword?hehe:hehe1}
          />
          </div> 
         
     
     
              </form>
          
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{paddingRight:'20px'}}>
        
        <Button variant="contained" size="medium" onClick={handleClose} id="publier">Annuler</Button>
        <Button variant="contained"
       disabled={
        formValue.oldpassword===undefined ||
        formValue.newpassword ===undefined  ||
        formValue.confirmPassword == undefined ||
        formValue.oldpassword=== '' ||
        formValue.newpassword === ''  ||
        formValue.confirmPassword == '' ||
        formValue.newpassword!=formValue.confirmPassword
        } 
        size="medium" onClick={handleSubmit} 
          id="publier"
          color="secondary"
          
          sx={{marginLeft:'3px',backgroundColor:'pink'}}
         >Ajouter</Button>
          
        
          
          </DialogActions>
        </Dialog>
        </div>
    </div>
  );
}

export default CompteUser;
const hehe1={
    backgroundColor:'orange' ,
    width: "65%",marginLeft:'18%',marginTop:'20px'
}
const hehe={
 
    width: "65%",marginLeft:'18%',marginTop:'20px'
}