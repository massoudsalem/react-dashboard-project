import React, { useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { Check, Upload } from '@mui/icons-material';

const ImageUpload = ({ onChange, inputRef, errors }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [uploadState, setUploadState] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleThumbnailChange = (event) => {
    if (!event.target.files[0]) return;
    if (uploadState === 'uploaded') {
      setUploadState('ready');
      setThumbnailUrl('');
      setFile(null);
    }
    const newFile = event.target.files[0];
    const preview = URL.createObjectURL(newFile);
    setFile(newFile);
    setThumbnailUrl(preview);
  };

  const uploadThumbnail = async () => {
    const formData = new FormData();
    formData.append('upload_preset', 'ms9f59ll');
    formData.append('file', file);
    setUploadState('uploading');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
        formData,
      );
      setUploadState('uploaded');
      onChange(response.data.secure_url);
    } catch (error) {
      console.error('Error:', error);
      setUploadState('failed');
    }
  };
  return (
    <Box className="flex flex-col items-center justify-center">
      <Box className="relative mx-1 my-4 box-border inline-flex h-28 w-28 border-[1px] border-solid border-gray-400 p-2">
        {uploadState === 'uploading' && (
          <Box className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-gray-500 bg-opacity-50  text-white">
            <Typography variant="body2">Uploading</Typography>
            <LinearProgress className="w-full" />
          </Box>
        )}
        {uploadState === 'uploaded' && (
          <Box className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-green-500 bg-opacity-50">
            <Check />
          </Box>
        )}
        {uploadState === 'failed' && (
          <Box className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-red-500 bg-opacity-50">
            <Typography variant="body2">Failed</Typography>
          </Box>
        )}
        {thumbnailUrl && (
          <Box className="flex flex-grow overflow-hidden">
            <img src={thumbnailUrl} alt="Product Thumbnail" />
          </Box>
        )}
        <IconButton
          className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-blue-500 p-[2px] text-white"
          color="primary"
          variant="contained"
          aria-label="upload picture"
          component="span"
          ref={inputRef}
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          <Upload />
        </IconButton>
      </Box>
      <input
        type="file"
        id="thumbnailInput"
        name="thumbnail"
        onChange={handleThumbnailChange}
        ref={fileInputRef}
        accept="image/*"
        className="absolute h-0 w-0 overflow-hidden"
        tabIndex="-1"
      />
      {errors.thumbnail && <span>This field is required</span>}
      <Button
        variant="contained"
        disabled={
          uploadState === 'uploaded' ||
          uploadState === 'uploading' ||
          !thumbnailUrl
        }
        onClick={() => uploadThumbnail(thumbnailUrl)}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUpload;
