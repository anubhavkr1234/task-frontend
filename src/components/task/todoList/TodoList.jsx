import React, { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import { useTaskContext } from "../../../view/task/taskSystem";
import "./TodoList.css";

const TodoList = () => {
  const { tasks } = useTaskContext();
  const [sortBy, setSortBy] = useState("dueDate");

  const sortedTasks =
    tasks &&
    tasks.slice().sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          return a.priority - b.priority;
        case "creationDate":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "today":
          const today = new Date().toISOString().slice(0, 10);
          return new Date(a.dueDate) === today ? -1 : 1;
        case "tomorrow":
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return new Date(a.dueDate) === tomorrow.toISOString().slice(0, 10)
            ? -1
            : 1;
        default:
          return 0;
      }
    });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="creationDate">Creation Date</option>
          <option value="today">Today's Tasks</option>
          <option value="tomorrow">Tomorrow's Tasks</option>
        </select>
      </div>

      <div className="task-list">
        {sortedTasks &&
          sortedTasks.map((task) => <TaskItem key={task._id} task={task} />)}
      </div>
    </div>
  );
};

export default TodoList;
