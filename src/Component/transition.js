import React, { useState } from 'react';
import { useProductsContext } from './MainContext';
import Text from './textAnnimation';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { IconButton } from '@mui/material';
import '../Styles/Carousel.css'
const apikey=process.env.REACT_APP_API_URL;
const Carrousel = () => {
  const {ProductA}=useProductsContext();
  const rows=[]
  {ProductA.reverse().map((item) => (
    rows.push(item)
    
  ))}
  rows.reverse()
 const rowA=rows.slice(0,12)
  console.log(rowA)
  const [currentIndex, setCurrentIndex] = useState(0);

  const numVisibleImages = 4;

  const prevImage = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = Math.min(rowA.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
  };

  const visibleImages = rowA.slice(currentIndex, currentIndex + numVisibleImages);

  return (
    <div>
      <div className='titre'>
     <h4 style={{textAlign:'center',color:'white'}}>Nos recents produits</h4>
     <p style={{textAlign:'center',color:'white'}}>Explorez nos dernières trouvailles et soyez à la pointe de la tendance</p>
      </div>
    <div className="carousel" >
    <div className="carousel-images">
      {visibleImages.map((item, index) => (
        <div key={index} className="carousel-image">
           <img
              srcSet={`${apikey}/${item.image_path}`}
              src={`${apikey}/${item.image_path}`}
              alt={item.design}
              loading="lazy"
              style={{ 
                width: index === 0 || index === 3 ? '350px' : '240px',
                height: index === 0 || index === 3 ? '350px' : '240px',
                marginTop: index === 1 || index === 2 ? '10px':null,
                marginLeft: index === 1 ? '0px':null,
                marginRight: index === 2 ? '-20px':null,
               }}
             
            />
        </div>
      ))}
    </div>
    <div className='button'>
   {currentIndex === 0 ? null
     :
    <IconButton onClick={prevImage} >
          <WestIcon  sx={{color:'white',fontSize:'65px'}}></WestIcon>
  </IconButton>
   }
    {currentIndex + numVisibleImages >= rowA.length? null:
    <IconButton 
    style={{float:'right'}}
    onClick={nextImage} >
      <EastIcon  sx={{color:'white',fontSize:'65px'}}></EastIcon>
    </IconButton>
   
    }

    </div>
  </div>
  </div>
  );
};

export default Carrousel;
