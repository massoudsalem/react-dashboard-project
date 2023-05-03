import {
  Box,
  Divider,
  Unstable_Grid2 as Grid,
  Paper,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Icon,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useGetProductsQuery } from '../../services/FakeApi';

class BoxInfo {
  cosntructor(icon, title) {
    this.icon = icon;
    this.title = title;
  }
}

const boxesInfo = [
  new BoxInfo('monetization_on_sharp', 'price'),
  new BoxInfo('library_books_icon', 'No. of Orders'),
  new BoxInfo('layers_icon', 'Available Stocks'),
  new BoxInfo('archive_icon', 'Total Revenue'),
];

//const icons = [
//'monetization_on_sharp',
//'library_books_icon',
//'layers_icon',
//'archive_icon',
//];
//const label = ['price', 'No. of Orders', 'Available Stocks', 'Total Revenue'];

const ProductInfoBox = ({ icon, title, subtitle }) => (
  <Box className="px-4 py-2 border border-dashed border-gray-300 flex gap-10 items-center justify-between">
    <Icon className="flex-grow text-teal-500 text-3xl">{icon}</Icon>
    <Box className="flex-grow">
      <Typography variant="body1">{title}</Typography>
      <Typography variant="h6">{subtitle}</Typography>
    </Box>
  </Box>
);

const ProductDetails = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { data, isLoading } = useGetProductsQuery('');
  const theme = useTheme();

  const handleSelect = (event, selectedNew) => {
    if (selectedNew !== null) {
      setImageIndex(selectedNew);
    }
  };

  useEffect(() => {
    if (data) {
      setImages(data[0].productImages);
    }
  }, [data]);

  return (
    data && (
      <Grid container spacing={2} className="py-10 px-6">
        <Grid xs={4} className="flex items-center flex-col">
          {!isLoading && (
            <Box className="w-full">
              <img
                src={images[imageIndex]}
                alt="product1"
                className="max-w-full"
              />
            </Box>
          )}
          <ToggleButtonGroup
            size="large"
            exclusive
            value={imageIndex}
            onChange={handleSelect}
          >
            {data &&
              images.map((url, index) => (
                <ToggleButton value={index} key={index}>
                  <img src={url} alt={`product${index}`} className="w-10" />
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Grid>
        <Grid xs={8}>
          <h1>details</h1>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Paper elevation={0} sx={{ color: theme.palette.info.dark }}>
              {' '}
              <a className="text-inherit no-underline" href="/#">
                brand name
              </a>
            </Paper>
            <Paper elevation={0}> seller: &quot;name&quot; </Paper>
            <Paper elevation={0} sx={{ color: 'gray' }}>
              {' '}
              Published: &quot;date&quot;{' '}
            </Paper>
          </Stack>
          <Rating
            readOnly
            value={4.5}
            precision={0.1}
            size="small"
            className="mt-2"
          />
          <Stack direction="row" spacing={2}>
            {boxesInfo.map((box, idx) => (
              <ProductInfoBox
                key={idx}
                title={box.title}
                icon={box.icon}
                subtitle={data[0][box.title]}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    )
  );
};

export default ProductDetails;
