//TODO: Refactor this component
import React, { useEffect, useRef, useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material';
//import { Markup } from 'interweave';
import { useForm, Controller } from 'react-hook-form';
import { ImageDropzone, CustomTabs } from '..';
import { useGetCategoriesQuery } from '../../services/FakeApi';
import { publish } from '../../events/events';

export const BasicAlerts = ({ message }) => {
  return (
    <Alert variant="filled" severity="error">
      {message}
    </Alert>
  );
};
export const InputWithController = ({
  label,
  errors,
  inputProps,
  placeholder,
  ...rest
}) => (
  <Box className="flex flex-grow flex-col gap-2">
    <Typography variant="body1" component="label">
      {label}
    </Typography>
    <Controller
      {...rest}
      render={({ field }) => {
        const { ref, ..._rest } = field;
        return (
          <TextField
            variant="outlined"
            {..._rest}
            inputProps={inputProps}
            placeholder={placeholder}
          />
        );
      }}
    />
    {errors[rest.name]?.type === 'required' && (
      <BasicAlerts message={`${label} is required`} />
    )}
    {errors[rest.name]?.type === 'max' && (
      <BasicAlerts message={`${label}  can't be greater than 100`} />
    )}
    {errors[rest.name]?.type === 'min' && (
      <BasicAlerts message={`${label}  can't be less than 0`} />
    )}
  </Box>
);

const uploadImages = () => {
  publish('upload');
};

const CategorySelect = ({ ...rest }) => {
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
      <Select inputProps={{ ...rest }}>
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

const CreateProduct = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      stock: '',
      brand: '',
      category: '',
      thumbnail: '',
      images: { urls: [], status: 'ready' },
      orders: '',
      manufacturerName: '',
      manufacturerBrand: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    },
  });

  //console.log(upload[0]);
  //console.log(getValues());
  return (
    //eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
      <Box component={Paper} className="m-2 p-4">
        <InputWithController
          label="Product Title"
          name="title"
          placeholder="Enter Product Title"
          control={control}
          rules={{ required: true }}
          errors={errors}
        />

        <Typography variant="body2">Product Description</Typography>
        {/*<Controller
          name="description"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            return (
              <CKEditor
                editor={Editor}
                data={field.value}
                onChange={(event, editor) => {
                  field.onChange(editor.getData());
                }}
              />
            );
          }}
        />
        {errors.description?.type === 'required' && (
          <BasicAlerts message="description is required" />
        )}*/}
      </Box>
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="subtitle2">Product Images</Typography>
        <Typography variant="body2">Upload Product Images</Typography>
        <Controller
          name="description"
          rules={{
            required: true,
            validate: {
              uploadCompleted: (value) => value.status === 'uploaded',
            },
          }}
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <ImageDropzone {...rest} />;
          }}
        />
        {errors.images?.type === 'validate' && (
          <BasicAlerts message="Please wait for the images to upload" />
        )}
      </Box>
      <CustomTabs labels={['General info']}>
        <Box>
          <Box component={Paper} className="m-2 flex flex-col gap-6 p-4">
            <Box className="flex flex-row flex-wrap gap-6">
              <InputWithController
                label="Manufacturer Name"
                name="manufacturerName"
                placeholder="Enter Manufacturer Name"
                control={control}
                rules={{ required: true }}
                errors={errors}
              />
              <InputWithController
                label="Manufacturer Brand"
                name="manufacturerBrand"
                placeholder="Enter Manufacturer Brand"
                control={control}
                rules={{ required: true }}
                errors={errors}
              />
            </Box>
            <Box className="flex flex-row flex-wrap gap-6">
              <InputWithController
                label="Stock"
                name="stock"
                placeholder="stock"
                control={control}
                rules={{ required: true }}
                errors={errors}
                inputProps={{ type: 'number', min: 0 }}
              />
              <InputWithController
                label="Price"
                name="price"
                placeholder="Enter Price"
                control={control}
                rules={{ required: true }}
                inputProps={{ type: 'number', min: 0 }}
                errors={errors}
              />
              <InputWithController
                label="Discount"
                name="discountPercentage"
                placeholder="Enter Discount"
                inputProps={{ type: 'number', min: 0, max: 100 }}
                control={control}
                rules={{ required: true, min: 0, max: 100 }}
                errors={errors}
              />
              <InputWithController
                label="Orders"
                name="orders"
                placeholder="Orders"
                control={control}
                rules={{ required: true }}
                errors={errors}
                inputProps={{ type: 'number', min: 0 }}
              />
            </Box>
          </Box>
        </Box>
      </CustomTabs>
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="h6">Product Category</Typography>
        <Typography variant="body2">Select Product Category</Typography>
        <Controller
          name="category"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <CategorySelect {...rest} />;
          }}
        />
        {errors.category?.type === 'required' && (
          <BasicAlerts message="category is required" />
        )}
      </Box>
      <input type="submit" />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        //disabled={upload[0] >= 1}
        onClick={(event) => {
          event.preventDefault();
          uploadImages();
          handleSubmit((data) => {
            console.log(data);
          })();
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateProduct;
