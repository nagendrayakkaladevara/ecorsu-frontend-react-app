import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const SimpleBarChart = ({ formattedResult, color, XaxisKey }) => {
  console.log(formattedResult, "formattedResult");
  return (
    <BarChart
      width={400}
      height={300}
      data={formattedResult}
      margin={{
        top: 5, right: 20, left: 10, bottom: 55,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-90} textAnchor="end" interval={0} fontSize={10}/>
      <YAxis />
      <Tooltip />
      {/* <Legend margin={{top:40, right: 0, left: 0, bottom: 0,}}/> */}
      <Bar dataKey={XaxisKey} fill={color} />
    </BarChart>
  );
};

export default SimpleBarChart;
