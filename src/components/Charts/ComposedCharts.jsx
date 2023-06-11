import { useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const CustomizedAxisTick = ({ x, y, payload }) => {
  const theme = useTheme();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={60}
        y={0}
        dy={0}
        textAnchor="end"
        fill={theme.palette.mode === 'light' ? '#666' : '#ccc'}
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};
const ComposedCharts = ({ data, areaLabel, barLabel, barData, areaData }) => {
  const theme = useTheme();

  const isMD = useMediaQuery('(min-width:960px)');
  const width = isMD ? 600 : 500;
  return (
    <ResponsiveContainer width={width} aspect={1.5}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="20%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.9}
            />
            <stop
              offset="100%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.4}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          padding={{ left: 5 }}
          angle="90"
          tickMargin={70}
          interval={0}
          height={160}
          tick={<CustomizedAxisTick />}
          stroke={theme.palette.mode === 'light' ? '#666' : '#ccc'}
        />
        <YAxis
          label={{
            value: '#of Cities',
            angle: -90,
            fill: theme.palette.mode === 'light' ? '#666' : '#ccc',
          }}
          tickCount={7}
          stroke={theme.palette.mode === 'light' ? '#666' : '#ccc'}
        />
        <Tooltip
          wrapperStyle={{ border: 1, outline: 0 }}
          contentStyle={{ padding: 0 }}
          labelStyle={{
            background: '#999',
            paddingLeft: '5px',
            color: '#fff',
          }}
          itemStyle={{
            background: '#fff',
            padding: '5px 40px 5px 5px',
          }}
        />
        <Legend />
        <Area
          dataKey={barData}
          legendType="circle"
          name={barLabel}
          fill="url(#colorUv)"
          stroke={theme.palette.primary.main}
        />
        <Bar
          dataKey={areaData}
          legendType="circle"
          name={areaLabel}
          barSize={20}
          fill={theme.palette.success.main}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              className="hover:opacity-85 opacity-90"
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedCharts;
