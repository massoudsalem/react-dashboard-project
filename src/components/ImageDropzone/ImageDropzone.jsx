import React, { useEffect, useState } from 'react';
import { Check, Close, CloudUpload } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Input,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import {subscribe, unsubscribe } from '../../events/events';
import postCloudinary from '../../services/postCloudinary';

const ImageDropzone = ({onChange, value}) => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState({});
  const [uploadCompleted, setUploadCompleted] = useState(0);
  //setUploadCompleted(postCloudinary({ files, setImages }));
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 4,
    disabled: false /*disable on upload completed*/,
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

  useEffect(() => {
    console.log('uploadCompleted', uploadCompleted);
    console.log('images', images);
    if (uploadCompleted) {
      onChange({urls: Object.values(images).map((image) => image.url), status: uploadCompleted});
    }
  }, [uploadCompleted, images, onChange]);

  useEffect(() => {
    subscribe('upload', () => {
      setUploadCompleted(postCloudinary({ files, setImages, images }));
    });
    return () => {
      unsubscribe('upload');
    };
  }, []);
  

  return (
    <Box className="rounded-md  border-gray-400 p-4 ">
      <Box
        {...getRootProps({
          className:
            'flex flex-col items-center justify-center h-48 border-2 border-gray-400 border-dashed rounded-md hover:border-gray-600',
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
                <LinearProgress className="w-full" />
              </Box>
            )}
            {images[file.name]?.uploadState ===
              'uploaded' /*upload completed*/ && (
              <Typography className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-green-500 bg-opacity-50 text-white">
                <Check />
              </Typography>
            )}
            {(images[file.name]?.uploadState !== 'uploaded' ||
              !images[file.name]?.failed) /*upload not completed*/ && (
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
                  className="h-full w-full object-contain"
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
    </Box>
  );
};

export default ImageDropzone;
