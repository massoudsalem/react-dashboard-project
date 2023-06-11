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
    <Grid className="mx-auto flex flex-col items-center ">
      <Box className="mx-auto">
        <img
          src={dataImages[imageIndex]}
          alt="product1"
          className="max-w-full"
        />
      </Box>

      <ToggleButtonGroup
        size="small"
        exclusive
        onChange={handleSelect}
        value={imageIndex}
        className="flex flex-row flex-wrap"
      >
        {dataImages.map((url, index) => (
          <ToggleButton value={index} key={index} className="p-2">
            <img src={url} alt={`product${index}`} className="w-12 sm:w-20" />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Grid>
  );
};

export default ImageSlider;
