import { Axios } from 'axios';
import { useState } from 'react';

const ImageUpload = (files) => {
  const formData = new FormData();
  formData.append('upload_preset', 'ms9f59ll');

  files.forEach(async (file, index) => {
    formData.append(`file${index}`, file);

    try {
      const response = await Axios.post(
        'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
        formData,
      );
      setImageURL((prev) => [...prev, response.data.secure_url]);
    } catch (err) {
      console.log(err);
    }
  });
};
export { ImageUpload };
