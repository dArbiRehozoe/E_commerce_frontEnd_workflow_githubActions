import React, { useEffect, useState } from 'react';
import { useProductsContext } from './MainContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Avis from './CrudAvis';
function Details(props){
    const [open,setOpen]=useState(props.open)
    console.log(open)
    const handleClose =()=>{
        setOpen(false)
    
      }
return(
    <div>
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
          <DialogTitle><h3 style={{textAlign:'center'}}>Ajouter une professeur</h3></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
          
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>  
          
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{paddingRight:'20px'}}>
        
     <Button variant="contained" size="medium" onClick={handleClose} id="publier">Annuler</Button> 
          {/* <Button variant="contained"
        //  disabled={}

        size="medium" 
          id="publier"
          color="secondary"
          
          sx={{marginLeft:'3px',backgroundColor:'pink'}}
         >Ajouter</Button> */}
          
        
          
          </DialogActions>
        </Dialog>

</div>
)
}
export default Details