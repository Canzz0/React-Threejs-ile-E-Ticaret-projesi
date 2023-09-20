import React from "react";
import { Pie } from "react-chartjs-2";
import './chart.css'
const PieChart = ({ data }) => {
  return (
    <div className="chart-container mt-4">
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
};

export default PieChart;