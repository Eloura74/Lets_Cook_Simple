import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";

const DashboardButton = () => {
  const location = useLocation();
  const isActive = location.pathname === "/dashboard";

  return (
    <Link
      to="/dashboard"
      className={`btn-site group ${isActive ? "active" : ""}`}
    >
      <FaUserCog />
      <span>Dashboard</span>
    </Link>
  );
};

export default DashboardButton;
