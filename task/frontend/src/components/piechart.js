import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Piechart({ period = "daily" }) {
  // fake values for each period
  const valuesByPeriod = {
    daily:  [400, 320, 260, 200],   // Light, AC, Water, Others
    monthly:[850, 780, 640, 520],
    yearly: [1000, 920, 780, 620],
  };

  const currentValues = valuesByPeriod[period] || valuesByPeriod.daily;

  const data = {
    labels: ["Light", "AC", "Water", "Others"],
    datasets: [
      {
        label: "kWh",
        data: currentValues,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.formattedValue} kWh` } },
    },
    scales: {
      r: {
        ticks: { display: false },
        grid: { color: "#e5e7eb" },
        angleLines: { color: "#e5e7eb" },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="overall-chart-wrapper">
      <h3 className="part-title">
        {period === "daily"
          ? "Overall consumption"
          : period === "monthly"
          ? "Monthly consumption"
          : "Yearly consumption"}
      </h3>

      <div className="chart-placeholder radial-placeholder">
        <PolarArea data={data} options={options} />
      </div>

      <div className="legend">
        <span className="legend-dot legend-light"></span> Light - xxxx
        <span className="legend-dot legend-ac"></span> AC - xxxx
        <span className="legend-dot legend-water"></span> Water - xxxx
        <span className="legend-dot legend-others"></span> Others - xxxx
      </div>
    </div>
  );
}
