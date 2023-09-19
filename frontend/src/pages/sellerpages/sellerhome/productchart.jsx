import React from 'react';
import { useState } from 'react';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Data } from './data';
import PieChart from './pieChart';
Chart.register(CategoryScale);
function ProductChartComponent() {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
        "#aed0ff",
        "#7690e1",
        "#445589",
        "#19223c"
        ],
    
    borderWidth:5
  }
    ]
});

return (
  
   <PieChart chartData={chartData} />

);
}

export default ProductChartComponent;
