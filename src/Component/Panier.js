import React, { useState,useEffect } from "react";
import { TextField } from '@mui/material';
import { useProductsContext } from "./MainContext";
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Stack from '@mui/material/Stack';

function MonPanier() {
  const theme = useTheme();
  const apikey=process.env.REACT_APP_API_URL;
  const { Panier,addPanierPayPal ,addPanier,videPanier} = useProductsContext();
  const [formValue, setFormValue] = useState({});
  const [load,setLoad]=useState(false)
  const [user,setUser]=useState([]);
  useEffect(() => {
    const Users= JSON.parse(localStorage.getItem('user'));
    setUser(Users)
    console.log(Users)
 }, []);
  let panierData = {
    panier: [],
    prix_total: 0, // Initialiser le total à 0
    iduser: user.iduser, // Vous pouvez définir l'ID utilisateur ici
    adresse: "zee", // Vous pouvez définir l'adresse ici
  };

  const handleChange = (event,qt) => {
    const { name, value } = event.target;
    const inputValue = event.target.value;
    console.log(name)
    if(name!=="adresse")
    {
      if (inputValue <= qt) {
        setFormValue({ ...formValue, [name]: value });
      }
    }else{
      setFormValue({ ...formValue, [name]: value });
    }
  };

  Panier.forEach((PanierProduct) => {
    const quantity = formValue[PanierProduct.design] || 1; // Utilisez la quantité saisie ou 0 si elle n'est pas définie
    const totalLigne = parseFloat(PanierProduct.prix - (PanierProduct.prix*PanierProduct.promo)/100) * parseFloat(quantity);

    // Ajouter les détails de chaque produit au panier
    panierData.panier.push({
      sku: PanierProduct.id, // Utilisez l'ID du produit comme SKU
      name: PanierProduct.design,
      quantity: quantity,
      currency: "USD", // Vous pouvez définir la devise ici
      price: PanierProduct.prix - (PanierProduct.prix*PanierProduct.promo)/100,
    });
    panierData.adresse=formValue.adresse

    // Mettre à jour le total général
    panierData.prix_total += totalLigne;
  });
console.log(panierData)
  return (
    <div style={{marginLeft:'5%'}}>
      
      {console.log(Panier)}
      <Button 
            variant="contained"
            startIcon={< DeleteRoundedIcon />}
            onClick={videPanier}
            color="secondary"
            size="medium"
      
            sx={{marginLeft:'65%',marginTop:'10px',backgroundColor:'#C34129'}}
          >vider le panier
          </Button> <br />
     
      {Panier.map((PanierProduct, index) => {
        const quantity = formValue[PanierProduct.design] || 1;
        const totalLigne = parseFloat(PanierProduct.prix - (PanierProduct.prix*PanierProduct.promo)/100) * parseFloat(quantity);
        
        return (
          <tr key={index} style={{display:'flex',flexWrap:'wrap',width:'80%',marginTop:'15px'}}>
              <Card sx={{ display: 'flex' }}>
     <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`${apikey}/${PanierProduct.image_path}`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {PanierProduct.design}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          {PanierProduct.prix - (PanierProduct.prix*PanierProduct.promo)/100} USD/unité

          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          nombre de stock:{PanierProduct.qt}

          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <TextField
                id="outlined-number"
                name={PanierProduct.design}
                label="Quantiter"
                type="number"
                maxRows={4}
                style={{ width: "80%" }}
                value={formValue[PanierProduct.design] || ''}
                onChange={(event)=>{
                  handleChange(event,PanierProduct.qt)
                }}
               
              />
        </Box>
      </Box>
     
    </Card>
           <div className="panierprix" style={{margin:'auto'}}>
      <Alert severity="info">   Total :  {totalLigne} USD</Alert>

         
           </div>
            <div style={{width:'5%',margin:'auto'}}>
            <Button
                  variant="contained"
                  sx={{backgroundColor:'#663179'}}
                  onClick={(e)=>{addPanier(PanierProduct)}}
                >  
                   <ClearIcon /> 
                </Button>
        
            </div>
          </tr>
        );
      })}
      <hr    style={{ width: "80%"}}/>
     
    
      <Alert severity="warning" sx={{ width: "80%"}}>   
      
        Prix total de tous les produits     :    {panierData.prix_total} USD
       

     
       </Alert>
        

     
   
      <Alert severity="info" sx={{marginTop:'5px',width: "80%"}}>  
      Pour valider l'achat veuillez entrer l'adresse pour  livrer vos 
        produits,Ensuite appuyer sur le boutton ci-dessous et vous serrez rediriger <br />  vers votre compte Paypal pour Confirmer 
        le payement
</Alert>
   
  
      <TextField
           
                name="adresse"
                label="Adresse de livraison"
                type="text"
                maxRows={4}
                style={{ width: "50%",  marginTop: '10px' }}
                value={formValue.adresse || ''}
                onChange={handleChange}
              />
              <LoadingButton
        loading={load}
        loadingPosition="start"
        startIcon={<i class="fab fa-paypal"></i>}
        onClick={(e)=>{
          setLoad(true)
          addPanierPayPal(panierData)}
        }
        variant="contained"
        size="medium"
        disabled={formValue.adresse===undefined || formValue.adresse === ''}
        sx={{marginLeft:'8%',marginBottom:'100px',marginTop:'20px'}}
      >
              Payer Via PayPal
      </LoadingButton>

    </div>
  );
}

export default MonPanier;
