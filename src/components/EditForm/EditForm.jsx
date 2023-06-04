import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const EditForm = ({ editData, handleUpdate, handleClose, handleAddUser }) => {
  const [userInfo, setUserInfo] = useState(editData);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.id === undefined) {
      handleAddUser(userInfo);
      handleClose();
    } else {
      const { id } = editData;
      const newData = { ...userInfo };
      handleUpdate(id, newData);
      handleClose();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
    >
      <TextField
        label="firstName"
        id="firstName"
        defaultValue={userInfo?.firstName}
        size="small"
        onChange={handleChange}
        required
      />
      <TextField
        label="lastName"
        id="lastName"
        defaultValue={userInfo?.lastName}
        size="small"
        onChange={handleChange}
        required
      />
      <TextField
        label="phone"
        id="phone"
        defaultValue={userInfo?.phone}
        size="small"
        onChange={handleChange}
        required
      />
      <TextField
        label="email"
        id="email"
        defaultValue={userInfo?.email}
        size="small"
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        variant="contained"
        //color="secondary"
        style={{ alignSelf: 'center', padding: '5px 30px' }}
      >
        Submit
      </Button>
    </form>
  );
};

export default EditForm;
