import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useState } from 'react';

const ImageSlider = ({ dataImages }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleSelect = (event, selectedNew) => {
    if (selectedNew !== null) {
      setImageIndex(selectedNew);
    }
  };

  return (
    <Grid className="flex flex-col items-center ">
      <Box className="h-48 w-48 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
        <img
          src={dataImages[imageIndex]}
          alt="product1"
          className="h-full w-full object-contain"
        />
      </Box>

      <Box className="mt-4 flex items-center justify-center gap-2">
        <IconButton
          disabled={imageIndex === 0}
          variant="outlined"
          onClick={() => {
            if (imageIndex > 0) {
              setImageIndex(imageIndex - 1);
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        <ToggleButtonGroup
          size="small"
          exclusive
          onChange={handleSelect}
          value={imageIndex}
          className="flex flex-row flex-wrap justify-center"
        >
          {dataImages.map((url, index) => (
            <ToggleButton value={index} key={index} className="p-2">
              <img
                src={url}
                alt={`product${index}`}
                className="h-6 w-6 object-cover sm:h-12 sm:w-12"
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <IconButton
          disabled={imageIndex === dataImages.length - 1}
          variant="contained"
          onClick={() => {
            if (imageIndex < dataImages.length - 1) {
              setImageIndex(imageIndex + 1);
            }
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default ImageSlider;
