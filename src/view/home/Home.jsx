import React from "react";
import { TaskManagementSystem } from "../task/taskSystem";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
      }}
    >
      <Header name={"anubhav"} email={"anubhav@gmail.com"} />
      <TaskManagementSystem />
    </div>
  );
};

export default Home;
