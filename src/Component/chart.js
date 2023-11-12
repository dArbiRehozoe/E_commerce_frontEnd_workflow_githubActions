import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { useProductsContext } from './MainContext';

export default function BasicArea() {
  const [x,setx]=useState([])
  const [y,sety]=useState([])
  const [alerteAffichee, setAlerteAffichee] = useState(false);
   const {Charts}=useProductsContext(); 
   const reorderData = () => {
    const daysOfWeek = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const currentDay = new Date().toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase(); // Obtenez le jour actuel en français
  
    // Trouvez l'index du jour actuel dans le tableau des jours de la semaine
    const currentIndex = daysOfWeek.indexOf(currentDay)+1;
  
    // Créez un nouveau tableau en réorganisant les données
    const reorderedData = [
      ...daysOfWeek.slice(currentIndex), // À partir du jour actuel
      ...daysOfWeek.slice(0, currentIndex) // Jours précédents au jour actuel
    ].reduce((acc, day) => {
      acc[day] = Charts[day];
      return acc;
    }, {});
  
    return reorderedData;
  };
  const data=reorderData()
console.log(data)
   const xAxisData = Object.keys(data).filter(key => key !== 'total');
   const seriesData = Object.values(data).filter(value => typeof value === 'number');


 
  useEffect(() => {
        setTimeout(() => {
          setAlerteAffichee(true);
        }, 1000); // 3000 millisecondes équivaut à 3 secondes
      
    
  }, []);
 

  return (
    <div style={{marginTop:'-5%',overflow:'auto'}}> 
     {
alerteAffichee?
     <LineChart
    width={500}
    height={300}
    series={[
     
      { data: seriesData,   area: true, label: 'USD' },
      
    ]}
    xAxis={[{ scaleType: 'point', data: xAxisData}]}
  /> 
 :
 <div></div>

     }
         {/*  */}
  </div>
    // <LineChart
    //   xAxis={chartData.xAxis}
    //   series={chartData.series}
    //   width={500}
    //   height={300}
    // />
  );
}
