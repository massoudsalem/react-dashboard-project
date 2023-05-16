import { Close, CloudUpload, HandymanOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Input, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = () => {
  const [files, setFiles] = useState([]);
  const [imagesURL, setImageURL] = useState([]);
  const [isUploading, setIsUploading] = useState('upload');
  const imageUpload = () => {
    if (files.length === 0) return;
    setIsUploading('uploading....');
    const formData = new FormData();
    formData.append('upload_preset', 'ms9f59ll');

    files.forEach(async (file) => {
      setImageURL([]);
      formData.append('file', file);
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
          formData,
          //{
          //onUploadProgress: (progressEvent) => {
          //console.log(
          //`Upload Progress: ${Math.round(
          //(progressEvent.loaded / progressEvent.total) * 100,
          //)}%`,
          //);
          //},
          //},
        );
        setImageURL((prev) => [...prev, response.data.secure_url]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsUploading('uploaded');
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.avif'],
    },
    onDrop: (acceptedFiles) => {
      //TODO: remove object  assign
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file),
        })),
      );
    },
  });

  useEffect(() => {
    //Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  return (
    <Box className="border border-gray-400 border-solid p-4 rounded-md shadow-md">
      <Box
        className="flex flex-col rounded items-center p-[20px] border-2 border-gray-800 border-dashed bg-gray-200  outline-0 transition hover:opacity-80"
        {...getRootProps()}
      >
        <Input {...getInputProps()} />
        <CloudUpload className="text-8xl w-full " />
        <Typography>
          Drag &#39;n&#39; drop some files here, or click to select files
        </Typography>
      </Box>
      <Box className="thumbsContainer flex flex-wrap gap-2">
        {isUploading !== 'uploaded' && files.map((file) => (
          <Box
            className="inline-flex box-border mx-1 my-4 w-28 h-28 p-2 border-solid border-[1px] border-gray-400 relative"
            key={file.name}
          >
            <IconButton
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-[2px]"
              onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
            >
              <Close className="text-lg" />
            </IconButton>
            <Box className="flex min-w-0 overflow-hidden">
              <img
                src={file.preview}
                className="block object-cover w-full h-full"
                alt={file.name}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        className="my-2 w-full"
        onClick={imageUpload}
        disabled={isUploading !== 'upload'}
      >
        {isUploading}
      </Button>
    </Box>
  );
};

export default ImageDropzone;
