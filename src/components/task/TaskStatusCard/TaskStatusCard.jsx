import React from "react";
import "./TaskStatusCard.css";

const TaskStatusCard = ({ count, message }) => {
  return (
    <div className="card">
      <h3>{message}</h3>
      <p>{count}</p>
    </div>
  );
};

export default TaskStatusCard;
