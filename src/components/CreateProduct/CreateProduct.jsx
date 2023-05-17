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
  const upload = useState(0);

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
      <CustomTabs labels={['General info','Meta Data']}>
        <Box>
          <Box component={Paper} className="m-2 flex flex-col gap-6 p-4">
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField
                label="Manufacturer Name"
                placeholder="Enter Manufacturer Name"
              />
              <InputField
                label="Manufacturer Brand"
                placeholder="Enter Manufacturer Brand"
              />
            </Box>
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField label="Stocks" placeholder="Stocks" />
              <InputField label="Price" placeholder="Enter Price" />
              <InputField label="Discount" placeholder="Enter Discount" />
              <InputField label="Orders" placeholder="Orders" />
            </Box>
          </Box>
        </Box>
        <div>General Info</div>
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
