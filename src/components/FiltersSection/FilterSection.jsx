import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../services/FakeApi';

const RadioElement = ({ value, label }) => (
  <FormControlLabel
    slotProps={{ typography: { variant: 'body2' } }}
    value={value}
    control={<Radio />} //color="secondary"
    label={label}
  />
);

const FilterSection = ({ setProducts, data, className='' }) => {
  //TODo: make a const for min and max price
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('oldest');
  const [price, setPrice] = useState([0, 2000]);
  const [rating, setRating] = useState(0);
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();

  useEffect(() => {
    setProducts(() => {
      let newProducts = [...data];
      if (category !== 'all') {
        newProducts = newProducts.filter(
          (product) => product.category === category,
        );
      }
      if (sort === 'latest') {
        newProducts = newProducts.sort((a, b) => b.id - a.id);
      }
      if (sort === 'oldest') {
        newProducts = newProducts.sort((a, b) => a.id - b.id);
      }
      if (sort === 'asc') {
        newProducts = newProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'desc') {
        newProducts = newProducts.sort((a, b) => b.price - a.price);
      }
      newProducts = newProducts.filter(
        (product) => product.price >= price[0] && product.price <= price[1],
      );
      if (rating > 0) {
        newProducts = newProducts.filter((product) => product.rating >= rating);
      }
      return newProducts;
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort, price, rating]);

  if (categoriesLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (categoriesError) {
    return <h1> Sorry, Something went wrong.. </h1>;
  }
  return (
    <Paper
      variant="outlined"
      className={`flex min-w-[220px] flex-col gap-2 p-4 ${className}`}
    >
      <Typography variant="h5" className="mb-4">
        {' '}
        Filters{' '}
      </Typography>
      <Box className="flex flex-col gap-2">
        <InputLabel htmlFor="category"> Category </InputLabel>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="all"> All </MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {' '}
              {c}{' '}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider />
      <Box className="flex flex-col gap-2">
        <InputLabel htmlFor="sort"> Sort </InputLabel>
        <Select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <MenuItem value="latest"> Latest </MenuItem>
          <MenuItem value="oldest"> Oldest </MenuItem>
          <MenuItem value="asc"> Price (Low to High) </MenuItem>
          <MenuItem value="desc"> Price (High to Low) </MenuItem>
        </Select>
      </Box>
      <Divider />
      <Box className="flex flex-col gap-2">
        <InputLabel htmlFor="price"> Price </InputLabel>
        <Slider
          id="price"
          value={price}
          valueLabelDisplay="auto"
          onChange={(e, newValue) => setPrice(newValue)}
          min={0}
          max={1000}
          step={1}
          disableSwap
          //color="secondary"
          className="mt-7 w-5/6 self-center"
        />
        <Box className="flex items-center justify-between gap-2">
          <Input
            label="Min"
            value={price[0]}
            onChange={(e) =>
              setPrice([Math.min(e.target.value, price[1]), price[1]])
            }
            startAdornment={
              <Typography variant="subtitle2" className="m-1">
                {' '}
                ${' '}
              </Typography>
            }
            inputProps={{
              step: 10,
              min: 0,
              max: price[1],
              type: 'number',
            }}
          />
          <Typography variant="subtitle2"> to </Typography>
          <Input
            label="Max"
            value={price[1]}
            onChange={(e) =>
              setPrice([price[0], Math.max(e.target.value, price[0])])
            }
            startAdornment={
              <Typography variant="subtitle2" className="m-1">
                {' '}
                ${' '}
              </Typography>
            }
            inputProps={{
              step: 10,
              min: price[0],
              max: 1000,
              type: 'number',
            }}
          />
        </Box>
      </Box>
      <Divider />
      <Box className="flex flex-col gap-2">
        <InputLabel htmlFor="rating"> Rating </InputLabel>
        <RadioGroup
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <RadioElement value={0} label="All" />
          <RadioElement value={1} label="⭐️ & up" />
          <RadioElement value={2} label="⭐️⭐️ & up" />
          <RadioElement value={3} label="⭐️⭐️⭐️ & up" />
          <RadioElement value={4} label="⭐️⭐️⭐️⭐️ & up" />
        </RadioGroup>
      </Box>
    </Paper>
  );
};
export default FilterSection;
