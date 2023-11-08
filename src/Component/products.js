import React, { useEffect, useState } from 'react';
import { useProductsContext } from './MainContext';
import DialogActions from '@mui/material/DialogActions';
import '../Styles/detailsProduct.css'
import IconButton from '@mui/material/IconButton';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import AjoutProduitDialog from './AjoutProduitDialog';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Card from '@mui/material/Card';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import ModificationProduitDialog from './ModificationProduitDialog';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Avis from './CrudAvis';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavScrollCategorie from './NavCategorie';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
function Listproduct(props) {
  const apikey=process.env.REACT_APP_API_URL;
  const [openModificationDialog, setOpenModificationDialog] = useState(false);
  const [openAjoutDialog, setOpenAjoutDialog] = useState(false);
  const {deleteProduct,addProduct,updateProduct,addPanier ,Panier} = useProductsContext();
  const [formValueAjout, setformValueAjout] = useState({});
  const [search, setformSearch] = useState('');
  const [fileAjout,setFileAjout]=useState({})
  const [idproduit,setIdproduct]=useState('')
  const [showDetail, setShowDetail] = useState(null);

  const [user,setUser]=useState([]);
  useEffect(() => {
    const Users= JSON.parse(localStorage.getItem('user'));
    setUser(Users)
    console.log(Users)
 }, []);

  const handleOpenModificationDialog = () => {
    setOpenModificationDialog(true);
  };
  
  const handleOpenAjoutDialog = () => {
    setOpenAjoutDialog(true);
  };
  const handleChangeAjout =(event)=>{
  const {name,value}=event.target
  if(name==="promo"){
    console.log(value)
    if(value<100){
      setformValueAjout({ ...formValueAjout, [name]:value})
    }}
  else{
    setformValueAjout({ ...formValueAjout, [name]:value})
  }
}
  const handleChangeSearch =(event)=>{
  
     setformSearch(event.target.value)
    } 
  const handleFileChange =(event)=>{
    const selectedFile=event.target.files[0];
    console.log(selectedFile)
    setFileAjout(event.target.files[0])
  
  }
  const handleProductEditOpen=(data)=>{
    console.log(data.promo)
   handleOpenModificationDialog()
    setformValueAjout({
      categorie: data.categorie,
      description: data.description,
      design: data.design,
      promo: data.promo,
      prix:data.prix,
      qt: data.qt
    })
    setIdproduct(data.id)
    setFileAjout(data.file)
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('design', formValueAjout.design); 
    formData.append('qt', formValueAjout.qt);
    formData.append('description', formValueAjout.description);
    formData.append('categorie', formValueAjout.categorie);
    formData.append('promo', formValueAjout.promo);
    formData.append('prix', formValueAjout.prix);
    formData.append('file', fileAjout);
  
  const toutesLesValeurs = {};
    for (const [clé, valeur] of formData.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
   
  addProduct(toutesLesValeurs).then((result) => {
    if (result === true) {
      setOpenAjoutDialog(false)
      setformValueAjout({})
    } else {
      console.log('Erreur lors de l\'ajout du produit.');
    }
  })
  .catch((error) => {
    console.error('Une erreur est survenue:', error);
  });

  };


  const handleEdit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('design', formValueAjout.design);
    formData.append('qt', formValueAjout.qt);
    formData.append('description', formValueAjout.description);
    formData.append('categorie', formValueAjout.categorie);
    formData.append('promo', formValueAjout.promo);
    formData.append('prix', formValueAjout.prix);
    formData.append('file', fileAjout);

    const toutesLesValeurs = {};
    for (const [clé, valeur] of formData.entries()) {
      toutesLesValeurs[clé] = valeur;
    }
    
    // Maintenant, vous avez toutes les valeurs dans l'objet toutesLesValeurs
   
    updateProduct(idproduit,toutesLesValeurs).then((result) => {
      if (result === true) {
        setOpenModificationDialog(false)
        setformValueAjout({})
      } else {
        console.log('Erreur lors de l\'ajout du produit.');
      }
    })
    .catch((error) => {
      console.error('Une erreur est survenue:', error);
    });
};
  const rows = [];
  props.Products.forEach((product) => {
    if (`${product.design}`.indexOf(search) === -1 || product.corbeille ===0) {
      return;
  }
 rows.push(
  <div >         
    { showDetail === product.id ?
      <div className="divDetails">
         <div className="roww">
         <div className="columnrow" style={{backgroundColor:"white"}}>
          <IconButton
                sx={{left:"5%",height:'50px',top:'20px',position:'absolute',backgroundColor:'white',color:'gray'}}
                onClick={() => setShowDetail(null)}
              >
                <ArrowBackIosIcon sx={{marginLeft:'10px'}}/>
              </IconButton>
              <img src={`${apikey}/${product.image_path}`} 
               alt="First slide"
               className="d-block w-100"
               style={{
               height:"100%"
               }}
              />             
            
        </div>
        <div className="columnrow" style={{backgroundColor:"white"}}>
        <div >
<h5 className="widget-title" style={{textAlign:'center',textDecoration:'underline'}}>{product.design}
</h5>
  <b >Prix:</b>   ${product.prix - (product.prix*product.promo)/100} <br />
<b>Stock:</b> {product.qt} <br />
  <b>Catégorie:</b>  {product.categorie} <br />
  <b>Avie</b>: <Avis product={product} bool={true}/>
  <b>Stock</b>:{product.qt} <br />
  <b>Description</b>:  <br />   
  <p style={{
  }}>{product.description}</p> <br />
     {
                product.qt !==0 ?
                <Button
        
                variant="contained"
                startIcon=
                  {Panier.some((item) => item.id === product.id) 
                    ? <RemoveShoppingCartIcon/>
                    :<AddShoppingCartIcon /> }
                
                sx={{top:'-20px',margin:'auto'}}
                onClick={(e)=>{addPanier(product)}}
                color='secondary'
              >    
            {Panier.some((item) => item.id === product.id)
              ? 'Retirer du panier'
              : 'Ajouter au panier'}
              </Button>
                :
                <Button
                variant="contained"
                color='warning'
                
      
              >  
                 <ProductionQuantityLimitsRoundedIcon/>Produit en rupture de stock
              </Button>
              
                }
  
</div>
        </div>
       

      </div>    
      </div>   
    :
      <div></div>
    }
    <Card key={product.id} sx={{ width: 250, margin:2}}  >
      <CardActionArea >
        <div style={{position:'absolute',left:'3%',marginTop:'10px'}}> 
          { product.promo===0?
            <div></div>
          :
            <div 
              style={{
                padding:'10px',width:'50px',height:'50px',backgroundColor:'#C34129',
                color:'white',border:'1px solid #C34129',borderRadius:'50%'
              }}
            > 
              -{product.promo}%
            </div>
          }
          
        </div> 
        <div style={{position:'absolute',right:'2%',marginTop:'10px'}}> 
        {
             user.iduser !== 1 ? 
            <div></div>
          :
             <div>
             <CreateRoundedIcon sx={{color:'orange'}}  onClick={()=>handleProductEditOpen(product)}/>
             <DeleteRoundedIcon sx={{color:'red'}} onClick={(e)=>deleteProduct(product.id,product.corbeille)}/>
             </div> 
          }
          
        </div> 
        <div>
          <CardMedia
            onClick={() => setShowDetail(product.id)}
            component="img"
            height="140"
            image={`${apikey}/${product.image_path}`}
            alt="green iguana"
          />
          <div >
            <CardContent >
              <Typography gutterBottom variant="h6" component="div">
                {product.design}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{display:'flex'}}>
                <div style={{position:'absolute'}}>
                  <Avis product={product}/>  
                    {
                      product.promo===0?
                      <div><b>${product.prix}</b></div>
                    :  
                      <div>$<s>{product.prix} </s>  <b style={{paddingLeft:'8px'}}> ${product.prix - (product.prix*product.promo)/100}</b> </div>
                    }
                  
                </div>  
                {
                product.qt !==0 ?
                <Button
                  variant="contained"
                  sx={{float:'right',left:160,backgroundColor:'#c34a91'}}
                  onClick={(e)=>{addPanier(product)}}
                >  
                  {
                  Panier.some((item) => item.id === product.id) 
                   ? <RemoveShoppingCartIcon/>
                   :<AddShoppingCartIcon />
                  }
                </Button>
                :
                <Button
                variant="contained"
                color='warning'
                sx={{float:'right',left:160}}
               
              >  
                 <ProductionQuantityLimitsRoundedIcon/> 
              </Button>
              
                }
              </Typography>
            </CardContent>
          </div>
        </div>
      </CardActionArea>
                  
    </Card> 
  </div>   
  )});
  return (
    <div>
      {showDetail!==null ?
        <div className="blurDetails"> </div>
      :
        <div></div> 
      }
      <NavScrollCategorie search={search} handleChangeSearch={handleChangeSearch}></NavScrollCategorie>
      {
           user.iduser !== 1 ? 
            <div></div>
          :
          <div       className='boutton' >
          <Button 
            variant="contained"
            startIcon={< AddRoundedIcon />}
            onClick={handleOpenAjoutDialog}
            color="secondary"
            size="medium"
          >
            Ajouter un produit
          </Button> <br />
          </div>
}
   
      <div className='containerProduct' >
        {rows.reverse()}    
        { rows.length === 0
           ? 
           <Alert  s severity="error"> 
           Auccun produit n'a été trouver
           </Alert>
    

          :
          <div ></div> 

          }
  
      </div>
                    {/* <------------------------ Ajout et Modification d'un produit------------------------> */}

      <AjoutProduitDialog
        open={openAjoutDialog}
        handleClose={() => {
          setOpenAjoutDialog(false)
          setformValueAjout({})
        }}
        handleChangeAjout={handleChangeAjout} 
        handleSubmit={handleSubmit}
        formValueAjout={formValueAjout}
        handleFileChange={handleFileChange}
      />
      <ModificationProduitDialog
        open={openModificationDialog}
        handleClose={() => {
          setOpenModificationDialog(false)
          setformValueAjout({})
        }}
        handleChangeAjout={handleChangeAjout} 
        handleEdit={handleEdit}
        formValueAjout={formValueAjout}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}

export default Listproduct;
