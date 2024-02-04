// Home.jsx

import React from 'react';
import { Link } from "react-router-dom";
// import TaskManagementSystem from "../task/taskSystem";
import { TaskManagementSystem } from '../task/taskSystem';
import './Home.css'; // Import your CSS file
import Header from '../../components/header/Header';

const Home = () => {
  return (
    <div style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
      <Header name={"anubhav"} email={"anubhav@gmail.com"} />
        <TaskManagementSystem />
    </div>
  )
}

export default Home;
