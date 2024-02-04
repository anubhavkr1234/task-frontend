import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import avatarImage from "../../../public/avatar.jpeg";
import { useUserContext } from "../../App";

const Header = ({ name, email, onLogout }) => {
  const { emailId } = useUserContext();
  console.log({ emailId: emailId });

  return (
    <header className="header">
      <div className="header-container">
        <div className="user-avatar">
          <img src={avatarImage} alt="Avatar" className="avatar-image" />
        </div>
        <div className="user-info">
          <div className="user-email">{emailId}</div>
        </div>
        <Link to="/login" className="btn btn-light my-5">
          Logout
        </Link>
      </div>
    </header>
  );
};

export default Header;
