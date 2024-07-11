import React, { useEffect, useRef } from "react";

import { Bar } from "react-chartjs-2";
import Chart, { plugins } from "chart.js/auto";
const BarChart = ({ greenColor, label, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      if (greenColor) {
        gradient.addColorStop(1, "#B3FFBB");
        gradient.addColorStop(0, "#78FFB6");
      } else {
        gradient.addColorStop(1, "#FFE488");
        gradient.addColorStop(0, "#F8C513");
      }

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  return (
    <Bar
      ref={chartRef}
      className="px-4 pb-8 h-80 max-w-full"
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            // Label for bars
            label: label,
            // Data or value of your each variable
            data: data,
            // Color of each bar
            // backgroundColor: ["#F8C513"],
            borderRadius: 5,
            barThickness: 28,
          },
        ],
      }}
      //   height={100}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true, // Show horizontal grid lines
            },
          },
          yAxes: [
            {
              ticks: {
                // The y-axis value will start from zero
                beginAtZero: true,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontSize: 15,
          },
        },
        onHover: () => {},
      }}
    />
  );
};

export default BarChart;
