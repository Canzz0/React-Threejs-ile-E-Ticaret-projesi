import React from 'react'
import { Line } from 'react-chartjs-2'
import './chart.css'
function LineChart ({ data }) {
 
  const options = {
    scales: {
      y: {
        beginAtZero: true, // y eksenini 0'dan başlatma
      },
    },
    
  };

  return (
    <div  className="chart-container">
    <h2 className='text-center'>Çizgi Analizi</h2>
    <Line
      data={data}
      options={options}
    />
  </div>
  );
};

export default LineChart;