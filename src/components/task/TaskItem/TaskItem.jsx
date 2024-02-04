import React, { useState } from "react";
import { useTaskContext } from "../../../view/task/taskSystem";
import TaskForm from "../taskForm/TaskForm";
import { formatDate } from "../../../utils";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    handleDeleteTask,
    handleCompleteTask,
    handleEditTask,
    handlePriorityChange,
  } = useTaskContext();

  const onSubmitEditTask = (task) => {
    handleEditTask(task);
    setShowModal(!showModal);
  };
  const onCancleEditTask = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {formatDate(task.dueDate)}</p>
      <div className="action-buttons">
        <button onClick={() => handleCompleteTask(task)}>
          {task.completed ? " Already Completed" : "Pls Complete"}
        </button>
        <button onClick={onCancleEditTask}>Edit</button>
        <select
          value={task.priority}
          onChange={(e) => handlePriorityChange(task, e.target.value)}
        >
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
        </select>
        <button onClick={() => handleDeleteTask(task)}>Delete</button>
      </div>
      {showModal && (
        <TaskForm
          onSubmit={onSubmitEditTask}
          onCancel={onCancleEditTask}
          task={task}
        />
      )}
    </div>
  );
};

export default TaskItem;
