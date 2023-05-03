import {
  Unstable_Grid2 as Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';
import { image1 } from '../../assets';

const ProductDetails = () => {
  const [imageSelected, setimageSelected] = useState(`image${1}`);

  const handleSelect = (event, selectedNew) => {
    setimageSelected(selectedNew);
  };

  console.log('ProductDetails');
  return (
    <Grid container spacing={2} className="py-10 px-6">
      <Grid xs={4}>
        <div className="w-full">
          <img src={image1} alt="product1" className="max-w-full" />
        </div>
        <ToggleButtonGroup
          exclusive
          value={imageSelected}
          onChange={handleSelect}
        >
          <ToggleButton value="image1">
            <img src={image1} alt="product1" className="w-5" />
          </ToggleButton>
          <ToggleButton value="image2">
            <img src={image1} alt="product3" className="w-5" />
          </ToggleButton>
        </ToggleButtonGroup>

        {/*<div>

          <img src="" alt="product2" />
          <img src="" alt="product3" />
          <img src="" alt="product4" />
        </div>*/}
      </Grid>
      <Grid xs={8}>
        <h1>details</h1>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
