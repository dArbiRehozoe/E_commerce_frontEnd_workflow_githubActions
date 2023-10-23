import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useProductsContext } from "./MainContext";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState ,useEffect} from 'react';
function Historique() {
  const { Historique,pdf } = useProductsContext();
  const [condition,setCondition]=useState("Thu Jan 01 1970")
  // Déclarez un état pour stocker la date sélectionnée
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [user,setUser]=useState([]);
  useEffect(() => {
    const Users= JSON.parse(localStorage.getItem('user'));
    setUser(Users)
    console.log(Users)
 }, []);
  // Créez une fonction de gestionnaire d'événements pour mettre à jour l'état lorsque la date est sélectionnée
  const handleDateChange = (date) => {

    setSelectedDate(date);
    setCondition(new Date(date).toDateString());

  };
  const rows = [];
 
  Historique.forEach((facture) => {
    const formattedSelectedDate =  new Date(selectedDate).toDateString();
    const formattedFactureDate = new Date(facture.date).toDateString();
   
    console.log(selectedDate)
  
    if (condition!=="Thu Jan 01 1970" && formattedSelectedDate.indexOf(formattedFactureDate) === -1) {
      return ;
    }
 rows.push(
  <li className="liste" key={facture.num_facture}>
  <Alert severity="info">
      <div style={{ display: "flex", color: "rgb(141, 141, 141)" }}>
        <div>
          <b>Facture N°</b> : {facture.num_facture} <br />
          {
            user.iduser === 1 ?
            <div>
              <b>Email du client</b>:{facture.email } <br />
              <b>Nom du client</b>:{facture.pseudo} <br />
            </div>
            : <b></b>
          }
          <b>Date de payement</b>: {facture.date} <br />
          <b>Adresse de livraison</b>: {facture.adrss_liv} <br />
          <b>Produits:</b>
          <ul>
            {facture.produits.map((produit, index) => (
              <li key={index}>
                Design: {produit.design} - Prix: ${produit.prix} - Quantité: {produit.qt_produit} <br />
              </li>
            ))}
          </ul>
          <b>Total net  payer</b>: ${facture.total} <br />
        </div>
        <div style={{ margin: "auto", marginLeft: "9%" }}>
          <Button
            variant="contained"
          color='error'
            sx={{ width:'40px',height:'50px'}}
            onClick={()=>{
              pdf(facture)
            }}
          >
            <PictureAsPdfIcon />
          </Button>
        </div>
      </div>
    </Alert>
  </li>
 )});
 console.log(rows)
  return (
    <div>
      <div style={{display:'flex'}}>
      
        <div>
        <h4 className="titre">Liste des factures et Historiques de vos achats :</h4>
        <ul className="historique">
          
     { rows.reverse() }
     { rows.length === 0
           ? 
           <Alert  s severity="error"> 
           Auccun facture n'a été trouver
           </Alert>
    

          :
          <div ></div> 

          }
          {/* {Historique.filter((facture) => {
            
            
            // Vérifiez si selectedDate est défini et est une instance de Date
            if (selectedDate) {
              // Comparez la date sélectionnée avec la date de la facture
             
            }
            return false; // Aucune date sélectionnée, ne montrez rien
          }).map((facture) => (
         
          ))} */}
        </ul>
        </div>

        <div className='date' >
        <div  style={{backgroundColor:'white'}}>
      
      
        <Button
            variant="contained"
            onClick={()=>{
              setCondition("Thu Jan 01 1970")
          }}
            sx={{float:'right',marginRight:'30%',marginTop:'5%'}}
          >
           Tout afficher
          </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
     
          <StaticDatePicker
          showToolbar={false}
            value={selectedDate}
            onChange={handleDateChange}
            componentsProps={{ actionBar: { actions: [] } }}
          
          />
        
        </LocalizationProvider>
       
        </div>    
        </div>
      </div>
    </div>
  );
}
export default Historique;

           