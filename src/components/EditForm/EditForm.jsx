import { Button, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';

const EditForm = ({ editData, handleUpdate, handleClose, handleAddUser }) => {
  const [userInfo, setUserInfo] = useState(editData);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const phonePattern = /^\+?[0-9]{1,3} ?[0-9]{3} ?[0-9]{3} ?[0-9]{4}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [triedSubmit, setTriedSubmit] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });

    if (e.target.id === 'phone') {
      if (!phonePattern.test(e.target.value)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
    }
    if (e.target.id === 'email') {
      if (!emailPattern.test(e.target.value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (!phonePattern.test(userInfo.phone)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    if (!emailPattern.test(userInfo.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!phoneError && !emailError) {
      setUserInfo(userInfo);
      if (userInfo.id === undefined) {
        handleAddUser(userInfo);
        handleClose();
      } else {
        const { id } = editData;
        const newData = { ...userInfo };
        handleUpdate(id, newData);
        handleClose();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}
    >
      <TextField
        label="firstName"
        type="text"
        id="firstName"
        defaultValue={userInfo?.firstName}
        size="small"
        onChange={handleChange}
        required
      />
      <TextField
        label="lastName"
        type="text"
        id="lastName"
        defaultValue={userInfo?.lastName}
        size="small"
        onChange={handleChange}
        required
      />
      <Tooltip
        title="Please enter a valid phone number (e.g. +1 123 456 7890)"
        open={phoneError && triedSubmit}
        placement="bottom"
        arrow
      >
        <TextField
          label="phone"
          id="phone"
          defaultValue={userInfo?.phone}
          size="small"
          onChange={handleChange}
          required
          type="tel"
          error={phoneError && triedSubmit}
        />
      </Tooltip>
      <Tooltip
        title="Please enter a valid email address"
        open={emailError && triedSubmit}
        placement="bottom"
        arrow
      >
        <TextField
          label="email"
          type="email"
          id="email"
          defaultValue={userInfo?.email}
          size="small"
          onChange={handleChange}
          required
          error={emailError && triedSubmit}
        />
      </Tooltip>
      <TextField
        id="birthDate"
        type="date"
        defaultValue={userInfo?.birthDate}
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
