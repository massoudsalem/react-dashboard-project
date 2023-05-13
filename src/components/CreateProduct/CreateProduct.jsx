import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import { Markup } from 'interweave';

const CreateProduct = () => {
  const [contentData, setContentData] = useState(null);
  console.log(contentData);
  return (
    <Box>
      <CKEditor
        editor={Editor}
        data={contentData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
      />
      <Markup content={contentData} />;
    </Box>
  );
};

export default CreateProduct;
