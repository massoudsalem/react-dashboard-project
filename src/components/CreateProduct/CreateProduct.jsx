//TODO: Refactor this component
import React, { useEffect } from 'react';
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
  Divider,
} from '@mui/material';
//import { Markup } from 'interweave';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { ImageDropzone, CustomTabs, ImageUpload } from '..';
import { useGetCategoriesQuery } from '../../services/FakeApi';
import { changeCKEditorCssVars } from './CKVars';

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
            inputRef={ref}
            inputProps={{
              ...inputProps,
            }}
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

const CategorySelect = ({ inputRef, ...rest }) => {
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
    <Select className="w-full" inputProps={{ ...rest, inputRef }}>
      {categories.map((c) => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </Select>
  );
};

const CreateProduct = () => {
  const theme = useTheme();
  useEffect(() => {
    changeCKEditorCssVars(theme);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.palette.mode]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    //getValues,
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
    },
  });

  return (
    <form
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      onSubmit={handleSubmit(
        (data) => {
          console.log(data);
        },
        (err) => console.log(err),
      )}
    >
      {/*Rich text*/}
      <Box
        component={Paper}
        className="col-span-1 m-2 flex flex-col p-4 md:col-span-2 lg:row-span-2"
      >
        <InputWithController
          label="Product Title"
          className="flex-grow-0"
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
                ref={field.ref}
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
      {/*Categories*/}
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="h6">Product Category</Typography>
        <Divider className="-mx-4 my-2" />
        <Typography variant="body2">Select Product Category</Typography>
        <Controller
          name="category"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <CategorySelect inputRef={ref} {...rest} />;
          }}
        />
        {errors.category?.type === 'required' && (
          <BasicAlerts message="category is required" />
        )}
      </Box>
      {/*main product image*/}
      <Box component={Paper} className="m-2 p-4">
        <Typography variant="h6">Product Thumbnail</Typography>
        <Divider className="-mx-4 my-2" />
        <Typography variant="body2">Upload Product Thumbnail</Typography>
        <Controller
          name="thumbnail"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <ImageUpload inputRef={ref} {...rest} errors={errors} />;
          }}
        />
      </Box>
      {/*image Dropzone*/}
      <Box
        component={Paper}
        className="col-span-1 m-2 p-4 md:col-span-2 lg:col-span-3"
      >
        <Typography variant="h6">Product Images</Typography>
        <Divider className="-mx-4 my-2" />
        <Typography variant="body2">Upload Product Images</Typography>
        <Controller
          name="images"
          rules={{
            validate: {
              uploading: (value) => {
                return value.status === 'uploaded';
              },
              uploadFailed: (value) => {
                return value.status !== 'failed';
              },
            },
          }}
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <ImageDropzone inputRef={ref} {...rest} />;
          }}
        />
        {errors.images?.type === 'uploadFailed' && (
          <BasicAlerts message="image upload failed please refresh" />
        )}
        {errors.images?.type === 'uploading' && (
          <BasicAlerts message="upload images" />
        )}
      </Box>
      {/*info*/}
      <Box
        component={Paper}
        className="col-span-1 m-2 p-4 md:col-span-2 lg:col-span-3"
      >
        <CustomTabs labels={['General info']}>
          <Box>
            <Box className="m-2 flex flex-col gap-6 p-4">
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
                  label="Brand"
                  name="brand"
                  placeholder="Brand"
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
      </Box>

      <Button
        className="w-48"
        variant="contained"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateProduct;
