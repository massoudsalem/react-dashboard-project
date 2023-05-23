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
  ...rest1
}) => (
  <Box className="flex flex-grow flex-col gap-2">
    <Typography variant="body1" component="label">
      {label}
    </Typography>
    <Controller
      {...rest1}
      render={({ field }) => {
        const { ref, ...rest } = field;
        return (
          <TextField variant="outlined" {...rest} inputProps={inputProps} />
        );
      }}
    />
    {console.log('error', errors)}
    {errors[rest1.name]?.type === 'required' && (
      <BasicAlerts message={`${label} is required`} />
    )}
    {errors[rest1.name]?.type === 'max' && (
      <BasicAlerts message={`${label}  can't be greater than 100`} />
    )}
    {errors[rest1.name]?.type === 'min' && (
      <BasicAlerts message={`${label}  can't be less than 0`} />
    )}
  </Box>
);

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
  const [images, setImages] = useState({});
  const upload = useState(0);
  const uploadState = useRef(upload[0]);
  const imagesState = useRef(images);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
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
      images: [],
      orders: '',
      manufacturerName: '',
      manufacturerBrand: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    },
  });
  useEffect(() => {
    [uploadState.current] = upload;
  }, [upload[0]]);
  useEffect(() => {
    imagesState.current = images;
  }, [images]);
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
        <Controller
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
        )}
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
        {/*<Box>
          <Box component={Paper} className="m-2 flex flex-col gap-6 p-4">
            <Box className="flex flex-row flex-wrap gap-6">
              <InputField
                id="Meta Title"
                label="Meta Title"
                placeholder="Enter Meta Title"
              />
              <InputField
                id="Meta Keywords"
                label="Meta Keywords"
                placeholder="Enter Meta Keywords"
              />
            </Box>
            <Box className="flex flex-row flex-wrap gap-6">
              <TextField
                id="Meta Description"
                label="Enter Meta Description"
                multiline
                minRows={3}
                fullWidth
              />
            </Box>
          </Box>
        </Box>*/}
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

        {/*<button
        type="button"
        disabled={upload[0] >= 1}
        onClick={() => upload[1]((prev) => prev + 1)}
      >
        Upload
      </button>*/}
      </Box>
      <input type="submit" />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={upload[0] >= 1}
        onClick={(e) => {
          e.preventDefault();
          //uploaded if uploadState.current is 2
          //console.log(`uploadState.current is ${uploadState.current}`);
          //const checkImagesUpload = (data) => {
          //console.log(`uploadState.current is ${uploadState.current}`);
          //if (uploadState.current === 2) {
          //console.log('uploadState is 2');
          //data.images = images;
          //console.log('data', data);
          //} else {
          //console.log('uploadState is not 2');
          //setTimeout(() => {
          //checkImagesUpload(data);
          //}, 1000);
          //}
          //};
          const checkImagesUpload = (data) => {
            if (uploadState.current === 2) {
              return new Promise((resolve) => {
                resolve('resolved');
              });
            }
            return new Promise((resolve) => {
              setTimeout(() => {
                checkImagesUpload(data).then((value) => {
                  resolve(value);
                });
              }, 1000);
            });
          };
          handleSubmit(
            async (data) => {
              upload[1]((prev) => prev + 1);
              await checkImagesUpload(data);
              //TODO: get urls and put them in array and set it to images
              setValue('images', imagesState.current);
              //at this point data is complete
            },
            (err) => {
              console.log(err);
            },
          )();
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateProduct;
