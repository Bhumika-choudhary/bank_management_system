import React from "react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo">Bank Management System</span>
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
        </button>
        <div className="profile-icon">RS</div>
      </div>
    </header>
  );
};

export default Navbar;

