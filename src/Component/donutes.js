import React, { useState, useEffect } from 'react';
import { useProductsContext } from './MainContext';
import { PieChart } from '@mui/x-charts/PieChart';
function BasicPie() {
 const {Donnets}=useProductsContext()
 const [alerteAffichee, setAlerteAffichee] = useState(false);
 
console.log(Donnets)
useEffect(() => {
  
   
    setTimeout(() => {
      setAlerteAffichee(true);
    }, 1000); // 3000 millisecondes équivaut à 3 secondes
  

}, []);
  return (
    <div style={{marginTop:'12%',overflow:'auto'}}>
 {
alerteAffichee?
    <PieChart
      series={[
        {
          data: Donnets.map((item, index) => ({
            id: index,
          
            value: item.prixtotal,
         
            label: item.categorie,
          })),
        },
    ]}
    
    width={500}
    height={200}

 
      {...pieParams}
    />
      :
      <div></div> 
}
    </div>
  );
}

export default BasicPie;

const pieParams = { height: 200, margin: { right: 250 }};