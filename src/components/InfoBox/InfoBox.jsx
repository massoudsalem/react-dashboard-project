import { Box, Icon, Paper, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();

  const colors =
    theme.palette.mode === 'light'
      ? {
          primary: 'bg-blue-100',
          secondary: 'bg-gray-200',
          error: 'bg-red-200',
          success: 'bg-green-200',
          warning: 'bg-yellow-200',
          info: 'bg-blue-200',
          action: 'bg-gray-200',
        }
      : {
          primary: 'bg-blue-800',
          secondary: 'bg-gray-800',
          error: 'bg-red-800',
          success: 'bg-green-800',
          warning: 'bg-yellow-800',
          info: 'bg-blue-800',
          action: 'bg-gray-800',
        };
  return (
    <Box className="transition-all duration-500 hover:-translate-y-[10px] hover:drop-shadow-xl">
      <Box
        component={Paper}
        className="relative flex min-w-[200px] flex-col gap-5 p-4"
      >
        <Box className="flex items-baseline justify-between">
          <Typography variant="body1" noWrap>{title}</Typography>
          <Typography variant="subtitle1" className={`${titleColor}`} noWrap>
            <Icon fontSize="large">{subtitleIcon}</Icon>
            {subtitle}
          </Typography>
        </Box>
        <Typography variant="h6">{count}</Typography>
        <Link
          to={link}
          className="text-inherit underline opacity-80 hover:opacity-60"
        >
          <Typography variant="body2">See details</Typography>
        </Link>
        <Box
          className={`absolute bottom-0 right-0 -translate-x-2 -translate-y-2 p-2 ${colors[color]} h-12 w-12 rounded-md`}
        >
          <Icon
            color={theme.palette.mode === 'light' ? color : ''}
            className="text-3xl"
          >
            {icon}
          </Icon>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoBox;
