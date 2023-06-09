import { Box, Icon, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const InfoBox = ({
  icon,
  title,
  count,
  color = 'info',
  link = '/',
  subtitleIcon = 'home',
  titleColor = 'text-gray-800',
  subtitle = '+0.0 %',
}) => {
  const colors = {
    primary: 'bg-blue-100',
    secondary: 'bg-gray-200',
    error: 'bg-red-200',
    success: 'bg-green-200',
    warning: 'bg-yellow-200',
    info: 'bg-blue-200',
    action: 'bg-gray-200',
  };
  return (
    <Box className="transition-all duration-500 hover:-translate-y-[10px] hover:drop-shadow-xl">
      <Box
        component={Paper}
        className="relative flex min-w-[240px] flex-col gap-5 p-4"
      >
        <Box className="flex items-baseline justify-between">
          <Typography variant="body1">{title}</Typography>
          <Typography variant="subtitle1" className={`${titleColor}`}>
            <Icon fontSize="large">{subtitleIcon}</Icon>{subtitle}
          </Typography>
        </Box>
        <Typography variant="h6">{count}</Typography>
        <Link to={link} className="text-gray-500 underline">
          See details
        </Link>
        <Box
          className={`absolute bottom-0 right-0 -translate-x-2 -translate-y-2 p-2 ${colors[color]} h-12 w-12 rounded-md`}
        >
          <Icon color={color} className="text-3xl">
            {icon}
          </Icon>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoBox;
