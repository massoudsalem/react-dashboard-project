import { useMediaQuery } from '@mui/material';
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
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={60}
        y={0}
        dy={0}
        textAnchor="end"
        fill="#666"
        transform="rotate(-90)"
      >
        {payload.value}
      </text>
    </g>
  );
};
const ComposedCharts = ({
  data,
  areaLabel,
  barLabel,
  barData,
  areaData,
}) => {
  //console.log('composedCharts')
  const isMD = useMediaQuery('(min-width:960px)');
  const width = isMD ? 600 : 500;
  return (
    
    <ResponsiveContainer width={width} aspect={1.5}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="20%" stopColor="#8884d8" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0.4} />
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
        />
        <YAxis label={{ value: '#of Cities', angle: -90 }} tickCount={7} />
        <Tooltip
          wrapperStyle={{ border: 1, outline: 0 }}
          contentStyle={{ padding: 0 }}
          labelStyle={{ background: '#ddd', paddingLeft: '5px', color: '#555' }}
          itemStyle={{ padding: '5px 40px 5px 5px' }}
        />
        <Legend />
        <Area
          dataKey={barData}
          legendType="circle"
          name={barLabel}
          fill="url(#colorUv)"
          stroke="#5c6b99"
        />
        <Bar
          dataKey={areaData}
          legendType="circle"
          name={areaLabel}
          barSize={20}
          fill="#22baa5"
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
