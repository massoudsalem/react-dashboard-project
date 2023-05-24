import React, { useEffect, useState } from 'react';
import { Check, Close, CloudUpload } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Input,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import postCloudinary from '../../services/postCloudinary';

const ImageDropzone = ({ onChange, inputRef }) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState({});
  const [uploadCompleted, setUploadCompleted] = useState('ready');
  //setUploadCompleted(postCloudinary({ files, setImages }));
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    disabled: uploadCompleted === 'uploaded' /*disable on upload completed*/,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.avif'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    //Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  //1. When the `uploadCompleted` state updates
  useEffect(() => {
    //2. If the upload fails, update the form with the failed status
    if (uploadCompleted === 'failed') {
      onChange({ urls: [], status: uploadCompleted });
    }
    //3. If the upload is successful, update the form with the urls
    if (uploadCompleted === 'uploaded') {
      onChange({
        urls: Object.values(images).map((image) => image.url),
        status: uploadCompleted,
      });
    }
  }, [uploadCompleted, images, onChange]);

  //4. When the upload state changes
  useEffect(() => {
    //5. If the upload is still in progress
    if (uploadCompleted === 'uploading') {
      //6. Check if all images have been uploaded
      setUploadCompleted(
        files.every((file) => images[file.name]?.uploadState === 'uploaded')
          ? 'uploaded'
          : 'uploading'
      );
    }

    //7. If the upload is complete
    if (uploadCompleted === 'uploaded') {
      //8. Check if any images have failed
      setUploadCompleted(
        files.some((file) => images[file.name]?.failed) ? 'failed' : 'uploaded'
      );
    }
  }, [files, images]);

  return (
    <Box ref={inputRef} className="rounded-md  border-gray-400 p-4 ">
      <Box
        {...getRootProps({
          className: `flex flex-col items-center justify-center h-48 border-2 border-gray-400 border-dashed rounded-md hover:border-gray-600 ${
            uploadCompleted === 'uploaded' ? 'opacity-50' : ''
          }`,
        })}
      >
        <Input inputProps={getInputProps()} />
        <CloudUpload sx={{ fontSize: 50 }} />
        <Typography variant="body2">
          Drag &#39;n&#39; drop some files here, or click to select files
        </Typography>
      </Box>
      <Box className="mt-2 flex flex-wrap gap-2">
        {files.map((file) => (
          <Box
            key={file.name}
            className="relative mx-1 my-4 box-border inline-flex h-28 w-28 border-[1px] border-solid border-gray-400 p-2"
          >
            {images[file.name]?.failed /*upload failed*/ && (
              <Typography className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-red-500 bg-opacity-50 text-white">
                Failed
              </Typography>
            )}
            {images[file.name]?.uploadState === 'uploading' /*uploading*/ && (
              <Box className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-gray-500 bg-opacity-50  text-white">
                <Typography variant="body2">Uploading</Typography>
                <LinearProgress
                  className="w-full"
                  value={images[file.name]?.progress || 0}
                />
              </Box>
            )}
            {images[file.name]?.uploadState === 'uploaded' &&
              !images[file.name]?.failed /*upload completed*/ && (
                <Typography className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-green-500 bg-opacity-50 text-white">
                  <Check />
                </Typography>
              )}
            {images[file.name]?.uploadState !== 'uploaded' &&
              !images[file.name]?.failed /*upload not completed*/ && (
                <IconButton
                  className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-red-500 p-[2px] text-white"
                  onClick={() =>
                    setFiles(files.filter((f) => f.name !== file.name))
                  }
                >
                  <Close className="text-lg" />
                </IconButton>
              )}
            <Box className="flex flex-col">
              <Box className="flex flex-grow overflow-hidden">
                <img
                  src={file.preview}
                  className="h-full w-full object-cover"
                  alt={file.name}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        className="mt-2"
        variant="contained"
        disabled={files.length === 0 || uploadCompleted === 'uploaded'}
        onClick={() =>
          setUploadCompleted(postCloudinary({ files, setImages, images }))
        }
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageDropzone;
