import { Check, Close, CloudUpload } from '@mui/icons-material';
import { Box, Button, IconButton, Input, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = () => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState('upload');
  const [images, setImages] = useState({});
  const imageUpload = () => {
    if (files.length === 0) return;
    setIsUploading('uploading....');
    const formData = new FormData();
    formData.append('upload_preset', 'ms9f59ll');

    files.forEach(async (file) => {
      formData.append('file', file);
      setImages((prev) => ({ ...prev,
        [file.name]: {
          percent: 0,
          failed: false,
          url: '',
        },
      }
      ));
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              const percent = parseInt((loaded * 100) / total, 10);
              setImages((prev) => ({ ...prev, [file.name]: { ...prev[file.name], percent } }));
            },
          },
        );
        setImages((prev) => ({ ...prev, [file.name]: { ...prev[file.name], url: response.data.secure_url } }));
      } catch (err) {
        setImages((prev) => ({ ...prev, [file.name]: { ...prev[file.name], failed: true } }));
        //console.log('error uploading image');
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
  //console.log(images);
  useEffect(() => {
    //Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  console.log(getRootProps());
  return (
    <Box className="border border-gray-400 border-solid p-4 rounded-md shadow-md">
      <Box
        className="flex flex-col rounded items-center p-[20px] border-2 border-gray-800 border-dashed bg-gray-200  outline-0 transition hover:opacity-80"
        {...getRootProps()}
      >
        <Input inputProps={getInputProps()} />
        <CloudUpload className="text-8xl w-full " />
        <Typography>
          Drag &#39;n&#39; drop some files here, or click to select files
        </Typography>
      </Box>
      <Box className="flex flex-wrap gap-2">
        {files.map((file) => (
          <Box
            className="inline-flex box-border mx-1 my-4 w-28 h-28 p-2 border-solid border-[1px] border-gray-400 relative"
            key={file.name}
          >
            {
              images[file.name]?.failed && (
                <Typography className="absolute top-0 left-0 w-full h-full bg-red-500 bg-opacity-50 text-white flex items-center justify-center">
                  Failed
                </Typography>
              )

            }
            {!images[file.name]?.failed && (images[file.name]?.percent !== 100 ? (
              <IconButton
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-[2px]"
                onClick={() => setFiles(files.filter((f) => f.name !== file.name))}
              >
                <Close className="text-lg" />
              </IconButton>
            )
              : (
                <Box className="absolute rounded-full top-0 right-0 w-6 h-6 translate-x-1/2 -translate-y-1/2 bg-green-500 text-white">
                  <Check className="" />
                </Box>
              ))}
            <Box className="flex flex-col">
              <Box className="flex overflow-hidden">
                <img
                  src={file.preview}
                  className="block object-cover w-full h-full"
                  alt={file.name}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </Box>
              <LinearProgress color="secondary" variant="determinate" value={images[file.name]?.percent ?? 0} />
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
