import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function ModificationProduitDialog({ open, handleClose, handleChangeAjout, handleFileChange,handleEdit,formValueAjout }) {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//   };

  return (
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
          <DialogTitle><h3 style={{textAlign:'center'}}>Modifier le donné d'un Produit </h3></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            <div className='divi'> 
            <form className="publier">
            <div style={{marginTop:'10px',fontWeight:"800"}}>
                  <TextField
                   multiline
                   name='design'
                   label="Design"
                    type="text" 
                    id="outlined-multiline-flexible"
                    maxRows={4}
                    style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
                    value={formValueAjout.design || ''}
                    onChange={handleChangeAjout}
                  />
                  </div> 
               
          <TextField
           multiline
           name='description'
           label="Description"
            type="text" 
            id="outlined-multiline-flexible"
            maxRows={4}
            style={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
            value={formValueAjout.description || ''}
            onChange={handleChangeAjout}
          />
                  <div style={{marginTop:'10px',fontWeight:"800"}}>
                  <div style={{marginTop:'10px',marginLeft:'18%'}}>
                  <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    Seclectionnée un fichier
                  <VisuallyHiddenInput type="file"  onChange={handleFileChange}/>
                    {/* <input type="file" name="file" onChange={handleFileChange}/> */}
                  </Button>
                  
                  </div> 
         
          </div> 
          <FormControl fullWidth 
              sx={{width: "65%",marginLeft:'18%',marginTop:'20px'}} 
              
        >
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='categorie'

              label="Categorie"
              value={formValueAjout.categorie || ''}
              onChange={handleChangeAjout}
            >  
               <MenuItem value={"Vêtements"}>Vêtements et accessoires</MenuItem>
              <MenuItem value={"Électronique et high-tech"}>Électronique et high-tech</MenuItem>
              <MenuItem value={"Maison et jardin"}>Maison et jardin</MenuItem>
              <MenuItem value={"Sports et loisirs"}>Sports et loisirs</MenuItem>
              

            </Select>
          </FormControl>
           <div> 
           <TextField
                 id="outlined-number"
                name='promo'
                label="Promo"
                type="number" // Modifiez le type de 'text' à 'number'
                maxRows={4}
                max={100}
                style={{width: "65%", marginLeft:'18%', marginTop:'20px'}}
                value={formValueAjout.promo || ''}
                onChange={handleChangeAjout}
          />
          </div> 
          <div style={{marginTop:'10px',fontWeight:"800"}}>
        
        <TextField
           id="outlined-number"
          name='qt'
          label="Quantité"
          type="number" // Modifiez le type de 'text' à 'number'
          maxRows={4}
          style={{width: "65%", marginLeft:'18%', marginTop:'20px'}}
          value={formValueAjout.qt || ''}
          onChange={handleChangeAjout}
/>
    </div>  
          <TextField
                 id="outlined-number"
                name='prix'
                label="prix"
                type="number" // Modifiez le type de 'text' à 'number'
                maxRows={4}
                style={{width: "65%", marginLeft:'18%', marginTop:'20px'}}
                value={formValueAjout.prix || ''}
                onChange={handleChangeAjout}
          />
              </form>                   
            </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{paddingRight:'20px'}}> 
          <Button variant="contained" size="medium" onClick={handleClose}
          id="publier">Annuler</Button>
        <Button variant="contained"
           size="medium" 
          id="publier"
          color="secondary"
          sx={{marginLeft:'20px',backgroundColor:'pink'}}
          // disabled={
  
          //  }
          onClick={handleEdit}
         >Modifier</Button>
          </DialogActions>
        </Dialog>
  );
}

export default ModificationProduitDialog;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});