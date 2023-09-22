import React from "react";
import { Pie } from "react-chartjs-2";
import './chart.css'
const PieChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="text-center">Pasta Analizi</h2>
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PieChart;