import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useProductsContext } from './MainContext';

export default function TitlebarBelowMasonryImageList() {
    const {ProductA}=useProductsContext();
    const apikey=process.env.REACT_APP_API_URL;
    const rows=[]
    {ProductA.reverse().map((item) => (
      rows.push(item)
      
    ))}
    rows.reverse()
  
 
    // console.log(Products)
  return (
    <Box  className="listmage" >
      <ImageList variant="masonry" cols={3} gap={8}>
        {   rows.slice(0,12).map((item) => (
          <ImageListItem key={item.image_path}>
            <img
              srcSet={`${apikey}/${item.image_path}`}
              src={`${apikey}/${item.image_path}`}
              alt={item.design}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.design} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
