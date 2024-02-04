import React, { useState, useEffect, createContext, useContext } from 'react';
import PieChart from '../../components/pieChart/PieChart';
import TaskStatusCard from '../../components/task/TaskStatusCard';
import TodoList from '../../components/task/todoList/TodoList';
import { getTasks, addTask, deleteTask, completeTask, editTask, priorityChange } from '../../taskApiService/taskService'; // Functions to fetch data from backend
import './taskSystem.css';
import TaskForm from '../../components/task/taskForm/TaskForm';
import { formatDate } from '../../utils';

const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskManagementSystem = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);
  const [dueTasksCount, setDueTasksCount] = useState(0);
  const [allCompletedTasksCount,setAllCompletedTasksCount]=useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const formattedToday = formatDate(new Date());
      console.log({tasks,formattedToday})
      // Filter tasks for today's completed tasks
      const completedToday = tasks.filter(task => task.completed  && formatDate(task.completedDate) === formattedToday);
      // Filter tasks for pending tasks due today or before today
      const pendingTodayOrOverdue = tasks.filter(task => !task.completed && formatDate(task.dueDate) === formattedToday);
      // All due tasks (including pending tasks due today or before today)
      const allDueTasks = tasks.filter(task => !task.completed);
      const allCompletedTaskCount= tasks.filter(task => task.completed);

      setCompletedTasksCount(completedToday.length); // Update with the length of completedToday array
      setPendingTasksCount(pendingTodayOrOverdue.length); // Update with the length of pendingTodayOrOverdue array
      setDueTasksCount(allDueTasks.length); // Update with the length of allDueTasks array
      setAllCompletedTasksCount(allCompletedTaskCount.length);
    }
  }, [tasks]);



  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData); // Send task data to backend API to create a new task
      setTasks([...tasks, newTask]); // Add the new task to the task list
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  // State to store tasks

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  // Function to delete a task
  const handleDeleteTask = async (task) => {
    try{
         const newTaskList=await deleteTask(task);
         setTasks(newTaskList);
    }
    catch(error)
    {
      console.log('Error in deleting task');
    }
  };

  // for complete task flag
  const handleCompleteTask = async (task) => {
    try{
         const newTaskList=await completeTask(task);
         setTasks(newTaskList);
    }
    catch(error)
    {
      console.log('Error in change status of task in complete');
    }
  };


   // for edit
   const handleEditTask = async (task) => {
    try{
         const newTaskList=await editTask(task);
         setTasks(newTaskList);
    }
    catch(error)
    {
      console.log('Error in edit task ');
    }
  };

   // for priority change
   const handlePriorityChange = async (task, event) => {
    try {
      console.log(event);
      const newTaskList = await priorityChange(task, event);
      setTasks(newTaskList);
    } catch (error) {
      console.log('Error in priority Change');
    }
  };

  const [showModal,setShowModal]=useState(false);
  
  const onSubmitCreateTask=(taskData)=>{
    setShowModal(!showModal);
    handleAddTask(taskData);
  }
  const onCancleCreateTask=()=>{
    setShowModal(!showModal);
  }

  
  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, handleDeleteTask, handleAddTask, handleCompleteTask, handleEditTask, handlePriorityChange }}>
         <div>
         <h1 style={{ textAlign: 'center' }}>Task Management System</h1>

        <div className="dashboard">
          <PieChart completedTasksCount={completedTasksCount} pendingTasksCount={pendingTasksCount} dueTasksCount={dueTasksCount}  />
          <div className="card-container">
            <TaskStatusCard count={allCompletedTasksCount} message={"All Completed tasks"} />
            <TaskStatusCard count={dueTasksCount} message={"All Pending tasks"} />
          </div>
          <button onClick={()=>setShowModal(!showModal)}>Add task</button>
        <TodoList />
        {showModal && <TaskForm onSubmit={onSubmitCreateTask} onCancel={onCancleCreateTask}/>}
        </div>
   
      </div>
    </TaskContext.Provider>
  );
};


