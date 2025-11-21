import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

export default function PlotGraph({ period = "daily" }) {
  // fake data for each period
  const datasetsByPeriod = {
    daily: {
      labels: [
        "00:00","02:00","04:00","06:00","08:00",
        "10:00","12:00","14:00","16:00","18:00","20:00","22:00"
      ],
      values: [1200,1500,1800,2500,3200,4200,5000,5800,6500,7200,8000,8500],
    },
    monthly: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      values: [3000,3600,4100,4500,5200,5400,6000,6300,5900,5600,5200,4800],
    },
    yearly: {
      labels: ["2020","2021","2022","2023","2024","2025"],
      values: [4800,5400,3900,5200,4950,4300],
    },
  };

  const current = datasetsByPeriod[period] || datasetsByPeriod.daily;

  const data = {
    labels: current.labels,
    datasets: [
      {
        label: "Cost",
        data: current.values,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { drawBorder: false, color: "#e5e7eb" },
      },
      y: {
        grid: { drawBorder: false, color: "#e5e7eb" },
        ticks: { stepSize: 1000 },
      },
    },
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} />;
}
