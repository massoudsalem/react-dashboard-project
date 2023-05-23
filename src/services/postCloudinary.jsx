import { useState } from 'react';
//import axios from 'axios';

const uploadCompleted = 0;

const postCloudinary = ({ files, setImages, images }) => {
  console.log('postCloudinary');
  const formData = new FormData();
  formData.append('upload_preset', 'ms9f59ll');

  files.forEach((file) => {
    setImages((prev) => ({
      ...prev,
      [file.name]: { url: '', uploadState: 'ready', failed: false },
    }));
  });

  files.forEach(async (file) => {
    formData.append('file', file);
    setImages((prev) => ({
      ...prev,
      [file.name]: { ...prev[file.name], uploadState: 'uploading' },
    }));
    console.log('formData', formData);
    //fetch(
    //'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
    //{
    //method: 'POST',
    //body: formData,
    //},
    //)
    //.then((response) => response.json())
    //.then((data) => {
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], url: data.secure_url },
    //}));
    //})
    //.catch((error) => {
    //console.error('Error:', error);
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], failed: true },
    //}));
    //})
    //.finally(() => {
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], uploadState: 'uploaded' },
    //}));
    //});

    //try {
    //const response = await axios.post(
    //'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
    //formData,
    //{
    //onCompleted: () => {
    //console.log(file.name, 'completed');
    //},
    //}
    //);
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], url: response.data.secure_url },
    //}));
    //} catch (err) {
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], failed: true },
    //}));
    //} finally {
    //setImages((prev) => ({
    //...prev,
    //[file.name]: { ...prev[file.name], uploadState: 'uploaded' },
    //}));
    //}
  });
};

export default postCloudinary;
