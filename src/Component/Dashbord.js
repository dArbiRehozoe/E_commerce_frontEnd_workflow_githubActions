import { useProductsContext } from './MainContext';
import React, { useState } from "react";
import { TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import Container from 'react-bootstrap/Container';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import '../Styles/dashbord.css'
import BasicArea from './chart';
import BasicPie from './donutes';
function Dashbord(){
    const {Products,deleteProduct}=useProductsContext();
    const apikey=process.env.REACT_APP_API_URL;
    const rowsqt = [];
    const rowscorb = [];
  const [search, setformSearch] = useState('');

    const handleChangeSearch =(event)=>{
  
      setformSearch(event.target.value)
     } 
    Products.forEach((product) => {
      if (product.qt == "0" && product.corbeille === 1) {
        rowsqt.push(product)
    }
    })
    Products.forEach((product) => {
      if (`${product.design}`.indexOf(search) !== -1  &&product.corbeille !== 1) {
        rowscorb.push(product)
    }
    })
console.log(rowsqt)
console.log(rowscorb)
    return(
        <div >
                    <div className="dash">
         <div className="columndash" >
         <h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>         
        Recette de la semaine
        </h5>
        <BasicArea></BasicArea>
        </div>
        <div className="columndash">
        <div className="widget subscribe no-box">
<h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>
 Total vendu par categorie
</h5>

         <BasicPie></BasicPie>
     
</div>
        </div>
      
      </div>
         <div className="rowww">
         <div className="column" >
         <h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>Notification
</h5>
         {rowsqt.map((produit, index) => {
             return (
                <Alert key={index} style={{marginTop:'10px',width:'90%'}} severity="warning"> 
                 {produit.design} est en rupture de stock
                 </Alert>)
            })}
        </div>
        <div className="column" style={{backgroundColor:"rgba(220, 220, 220, 0.418)"}}>
        <div className="widget subscribe no-box">
<h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>Corbeille
</h5>
<Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex',margin:'auto', alignItems: 'center',  width: 360 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          value={search}
          onChange={handleChangeSearch}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Entrer le nom du produit"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    
      </Paper>
{rowscorb.map((produit, index) => {
       
        return (
          <tr className='tr' key={index} style={{display:'flex',flexWrap:'wrap',
          marginTop:'15px',marginLeft:'auto'}}>
              <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${apikey}/${produit.image_path}`}
            alt="Live from space album cover"
          />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          {produit.design}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
         
          nombre de stock:{produit.qt}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Button
                  variant="contained"
                  sx={{backgroundColor:'#663179',textTransform:'unset'}}
                  onClick={(e)=>deleteProduct(produit.id,produit.corbeille)}
                >  
               Restorer
                </Button>
        </Box>
      </Box>
     
    </Card>
         

         
          
            
          </tr>
        );
      })}
</div>
        </div>
      
      </div>


        </div>
    )
}
export default Dashbord;