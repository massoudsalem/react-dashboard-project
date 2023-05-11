import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,

} from 'recharts';

const ComposedCharts = ({ data, areaLabel, barLabel, barData, areaData }) => {
  //console.log('composedCharts')
  return (
    <ComposedChart
      width={600}
      height={400}
      data={data}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="20%" stopColor="#8884d8" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#8884d8" stopOpacity={0.4} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" padding={{ left: -30 }} tickMargin={5} />
      <YAxis label={{ value: '#of Cities', angle: -90 }} tickCount={7} />
      <Tooltip
        wrapperStyle={{ border: 1, outline: 0 }}
        contentStyle={{ padding: 0 }}
        labelStyle={{ background: '#ddd', paddingLeft: '5px', color: '#555' }}
        itemStyle={{ padding: '5px 40px 5px 5px' }}
      />
      <Legend />
      <Area dataKey={barData} legendType="circle" name={barLabel} fill="url(#colorUv)" stroke="#5c6b99" />
      <Bar dataKey={areaData} legendType="circle" name={areaLabel} barSize={20} fill="#22baa5">
        {
      data.map((entry, index) => (
        <Cell key={`cell-${index}`} className="hover:opacity-90" />
      ))
    }
      </Bar>
    </ComposedChart>

  );
};

export default ComposedCharts;