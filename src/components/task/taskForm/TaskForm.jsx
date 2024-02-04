import React, { useState, useEffect } from 'react';
import "./TaskForm.css"
import { useUserContext } from '../../../App';

const TaskForm = ({ onSubmit, onCancel, task = null }) => {
 const {emailId}=useUserContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    createdAt:'',
    user:emailId,
    _id:''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        priority: task.priority || '',
        createdAt: task.createdAt|| '',
        user: task.user|| '',
        _id : task._id || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </label>
        <label>
          Priority:
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
          </select>
        </label>
        <div className="button-group">
          <button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
