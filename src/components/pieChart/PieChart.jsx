import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTaskContext } from "../../view/task/taskSystem";

const PieChart = ({
  completedTasksCount,
  pendingTasksCount,
  dueTasksCount,
}) => {
  const { tasks } = useTaskContext();
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const data = {
        labels: ["Completed Today", "Pending Today ", "All Due Tasks"],
        datasets: [
          {
            data: [completedTasksCount, pendingTasksCount, dueTasksCount],
            backgroundColor: [
              "rgba(75, 002, 076, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 167, 0.6)",
            ],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };

      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: data,
        options: options,
      });
    }
  }, [tasks, completedTasksCount, pendingTasksCount, dueTasksCount]);

  // Function to resize canvas to fit its container
  const resizeCanvas = () => {
    const canvas = chartRef.current;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  };

  // Call resizeCanvas when component mounts and on window resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
