import React from 'react';
import { useState ,useEffect} from 'react';
import { useProductsContext } from './MainContext';
import StarsIcon from '@mui/icons-material/Stars';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton,Button } from '@mui/material';
function Avis  (props ) {
  const {addAvis,updateAvis,deleteAvis} = useProductsContext();
  const [nbstars,setNbstars]=useState(0)
  const produit=props.product
  const [nbstarsModif,setNbstarsModif]=useState(produit.note_utilisateur)

  const stars = [];
  const starsAjout = [];
  const starsExist=[]

 useEffect(() => {
setNbstarsModif(produit.note_utilisateur)
}, []);

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={i <=produit.note_moyenne ? hehe : hehe1}>
        ★
      </span>
    )
  }
  for (let i = 1; i <= 5; i++) {
    starsAjout.push(
      <IconButton key={i} onClick={()=>setNbstars(i)}  style={i <= nbstars ? hehe : hehe1}>
        ★
      </IconButton>
    );
  }
  for (let i = 1; i <= 5; i++) {

    starsExist.push(
      <IconButton key={i} onClick={()=>{
        setNbstarsModif(i)
      }}  style={i <= nbstarsModif ? hehe : hehe1}>
        ★
      </IconButton>
    );
  }
  return <div>
          <Rating name="half-rating-read" value={produit.note_moyenne} precision={0.5} readOnly />

           {
           produit.commande && props.bool ?
                produit.idavie===null?
                <div>
                      Ajouter votre Avis:
                   <div style={{display:'flex'}}>
                     <div  className="star-rating">{starsAjout}</div> 
                     <Button sx={{marginLeft:'14px',marginTop:'10px',width:'20px',height:'30px'}} color='primary' variant="contained"  onClick={()=>{
                      addAvis(nbstars,produit.id)
                      setNbstarsModif(nbstars)
                    }} >
                      <AddIcon/>
                     </Button>
               
                  </div>
                  </div>
                :
                <div>
                  Modifier ou supprimer votre avis 
                <div style={{display:'flex'}}>
        
                   <div  className="star-rating">{starsExist}</div>
                   <Button sx={{marginLeft:'14px',marginTop:'10px',width:'20px',height:'30px'}} color='warning' variant="contained" 
                    onClick={()=>{
                      updateAvis(produit.idavie,nbstarsModif,produit.id) 
                    }
                    } >
                      <ModeEditOutlineIcon
                      />
                     </Button>
                   <Button sx={{marginLeft:'14px',marginTop:'10px',width:'20px',height:'30px'}} color='error' variant="contained" 
                   onClick={()=>{
                    deleteAvis(produit.idavie)
                    setNbstars(0)
                    }}>
                      <DeleteIcon/>
                     </Button>
                 
                </div>
                </div>
           : <div></div>
           }
           
                         

        </div>
};
export default Avis;
const hehe={
    color:'orange' ,
}
const hehe1={
   color: 'gray',
   with:'7px'
}