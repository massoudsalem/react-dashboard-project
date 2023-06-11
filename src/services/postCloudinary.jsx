import axios from 'axios';

const postCloudinary = ({ files, setImages, images }) => {
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

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djqzkpum0/image/upload',
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setImages((prev) => ({
              ...prev,
              [file.name]: {
                ...prev[file.name],
                uploadState: 'uploading',
                percentCompleted,
              },
            }));
          },
        },
      );
      setImages((prev) => ({
        ...prev,
        [file.name]: { ...prev[file.name], url: response.data.secure_url },
      }));
    } catch (error) {
      console.error('Error:', error);
      setImages((prev) => ({
        ...prev,
        [file.name]: { ...prev[file.name], failed: true },
      }));
      return 'failed';
    } finally {
      setImages((prev) => ({
        ...prev,
        [file.name]: { ...prev[file.name], uploadState: 'uploaded' },
      }));
    }
  });

  let ret = files.every((file) => images[file.name]?.uploadState === 'uploaded')
    ? 'uploaded'
    : 'uploading';
  ret = files.some((file) => images[file.name]?.failed) ? 'failed' : ret;

  return ret;
};

export default postCloudinary;
