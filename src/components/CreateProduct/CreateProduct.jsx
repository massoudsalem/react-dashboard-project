import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Box,
  Paper,
  Typography,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Markup } from 'interweave';
import { ImageDropzone, CustomTabs } from '..';
import { useGetCategoriesQuery } from '../../services/FakeApi';

const InputField = ({ label, ...rest }) => (
  <Box className="flex flex-grow flex-col gap-1">
    <Typography variant="subtitle2" component="label">
      {label}
    </Typography>
    <TextField variant="outlined" {...rest} />
  </Box>
);

const CategorySelect = () => {
  const [category, setCategory] = useState('');
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
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
    <Box className="flex flex-grow flex-col gap-1">
      <Select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {' '}
            {c}{' '}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const CreateProduct = () => {
  const [contentData, setContentData] = useState(null);
  const [images, setImages] = useState({});
  const [inputs, setInputs] = useState({});
  const upload = useState(0);

  const handleInputChange = (e) => {
    setInputs((preInput) => ({ ...preInput, [e.target.id]: e.target.value }));
    console.log(inputs);
  };

  console.log(upload[0]);
  return (
    <>
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="subtitle2">Product Title</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter Product Title"
        />
        <Typography variant="body2">Product Description</Typography>
        <CKEditor
          editor={Editor}
          data={contentData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContentData(data);
          }}
        />
      </Box>
      {/*<Markup content={contentData} />;*/}
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="subtitle2">Product Images</Typography>
        <Typography variant="body2">Upload Product Images</Typography>
        <ImageDropzone images={images} setImages={setImages} upload={upload} />
      </Box>
      {/*<button
        type="button"
        disabled={upload[0] >= 1}
        onClick={() => upload[1]((prev) => prev + 1)}
      >
        Upload
      </button>*/}
      <CustomTabs labels={['General info', 'Meta Data']}>
        <Box>
          <Box component={Paper} className="m-2 flex flex-col gap-6 p-4">
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField
                id="Manufacturer Name"
                label="Manufacturer Name"
                placeholder="Enter Manufacturer Name"
                onChange={handleInputChange}
              />
              <InputField
                id="Manufacturer Brand"
                label="Manufacturer Brand"
                placeholder="Enter Manufacturer Brand"
                onChange={handleInputChange}
              />
            </Box>
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField
                id="Stocks"
                label="Stocks"
                placeholder="Stocks"
                onChange={handleInputChange}
              />
              <InputField
                id="Price"
                label="Price"
                placeholder="Enter Price"
                onChange={handleInputChange}
              />
              <InputField
                id="Discount"
                label="Discount"
                placeholder="Enter Discount"
                onChange={handleInputChange}
              />
              <InputField
                id="Orders"
                label="Orders"
                placeholder="Orders"
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <Box component={Paper} className="m-2 flex flex-col gap-6 p-4">
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField
                id="Meta Title"
                label="Meta Title"
                placeholder="Enter Meta Title"
                onChange={handleInputChange}
              />
              <InputField
                id="Meta Keywords"
                label="Meta Keywords"
                placeholder="Enter Meta Keywords"
                onChange={handleInputChange}
              />
            </Box>
            <Box className="flex flex-row flex-wrap gap-6">
              <TextField
                id="Meta Description"
                label="Enter Meta Description"
                multiline
                minRows={3}
                fullWidth
                onChange={handleInputChange}
              />
            </Box>
          </Box>
        </Box>
      </CustomTabs>
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="h6">Product Category</Typography>
        <Typography variant="body2">Select Product Category</Typography>
        <CategorySelect />
      </Box>
    </>
  );
};

export default CreateProduct;
