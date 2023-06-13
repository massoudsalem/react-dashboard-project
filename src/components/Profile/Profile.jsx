//user profile page
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Divider,
  Button,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetMultipleUsersByIdsQuery } from '../../services/FakeApi';
import { logout } from '../../services/auth';

const Detail = ({ label, value }) => {
  return (
    <>
      <Box className="flex items-start justify-between sm:gap-32">
        <Typography variant="subtitle2" className="">
          {label}:
        </Typography>
        <Typography variant="body2" className="opacity-80">
          {value}
        </Typography>
      </Box>
      <Divider />
    </>
  );
};

const Profile = () => {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const params = useParams();
  const isProfilePage =
    location.pathname === '/profile' || id.toString() === params.id;
  const requestedId = isProfilePage ? id : params.id;
  const { data, error, isLoading } = useGetMultipleUsersByIdsQuery([
    requestedId,
  ]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) {
    <Box className="flex h-[50vh]  items-center justify-center">
      <CircularProgress />
    </Box>;
  }

  if (error) {
    <Box className="flex h-[50vh]  items-center justify-center">
      <Typography variant="h4" className="font-bold">
        {error}
      </Typography>
    </Box>;
  }
  const user = data?.[0];

  return (
    <Card className="flex flex-col gap-4">
      <Box className="flex flex-col justify-start gap-6 p-4 md:flex-row">
        <Box className="flex flex-1 flex-col items-center justify-center">
          <img
            src={user?.image}
            alt="user"
            className="h-20 w-20 rounded-full
            md:h-48 md:w-48 md:rounded-none
            lg:h-56 lg:w-56 lg:rounded-none
            "
          />
          <Typography variant="h4" align="center" className="font-bold">
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>

        <Box className="flex flex-1 flex-col justify-center">
          <Typography
            variant="h5"
            className="self-center font-bold md:self-start"
          >
            User Details
          </Typography>
          <Box className="self-center font-bold md:self-start">
            <Detail label="Email" value={user?.email} />
            <Detail label="Phone" value={user?.phone} />
            <Detail label="Username" value={user?.username} />
            <Detail label="Birth Date" value={user?.birthDate} />
            <Detail label="Blood Group" value={user?.bloodGroup} />
            <Detail label="Height" value={user?.height} />
            <Detail label="Weight" value={user?.weight} />
            <Detail label="Eye Color" value={user?.eyeColor} />
          </Box>
        </Box>
      </Box>
      {isProfilePage && (
        <Button
          variant="contained"
          color="primary"
          className="m-4"
          onClick={() => {
            dispatch(logout());
            navigate('/login');
          }}
        >
          Logout
        </Button>
      )}
    </Card>
  );
};

export default Profile;
