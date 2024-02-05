import React, { createContext, useState, useContext, useEffect } from "react";
import Home from "./view/home/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

function App() {
  const [emailId, setEmailId] = useState("");

  useEffect(() => {
    // Retrieve emailId from localStorage when component mounts
    const storedEmailId = localStorage.getItem("emailId");
    if (storedEmailId) {
      setEmailId(storedEmailId);
    }
  }, []);

  // Update emailId in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("emailId", emailId);
  }, [emailId]);

  const isAuthenticated = !!emailId; // Check if emailId exists (user is authenticated)

  return (
    <div>
      <UserContext.Provider value={{ emailId, setEmailId }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
