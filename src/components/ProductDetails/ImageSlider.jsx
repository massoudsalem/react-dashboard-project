import { Box, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';

const ImageSlider = ({ dataImages }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleSelect = (event, selectedNew) => {
    if (selectedNew !== null) {
      setImageIndex(selectedNew);
    }
  };

  return (
    <Grid className="flex items-center flex-col w-2/5">
      <Box className="w-full">
        <img
          src={dataImages[imageIndex]}
          alt="product1"
          className="max-w-full"
        />
      </Box>

      <ToggleButtonGroup
        size="large"
        exclusive
        onChange={handleSelect}
        value={imageIndex}
      >
        {dataImages.map((url, index) => (
          <ToggleButton value={index} key={index} className="p-2">
            <img src={url} alt={`product${index}`} className="w-20" />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid>
  );
};

export default ImageSlider;
