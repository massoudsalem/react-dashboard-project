import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, tooltipLabel = '' }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={
        {
          p: 1,
          borderRadius: 1,
          boxShadow: 1,
          border: 1,
          backgroundColor: payload[0].payload.fill,
          color: 'white',
        }
      }
      >
        <Typography variant="body2">{`${payload[0].name}: ${payload[0].value} ${tooltipLabel}`}</Typography>
      </Box>
    );
  }

  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold">
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({ data, label = '' }) => {
  console.log('CustomPieChart');
  return (
    <PieChart width={400} height={350}>
      <Pie
        data={data}
        innerRadius={80}
        outerRadius={140}
        fill="#8884d8"
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80" />
        ))}
      </Pie>
      <Legend />
      <Tooltip content={<CustomTooltip tooltipLabel={label} />} />
    </PieChart>
  );
};

export default CustomPieChart;