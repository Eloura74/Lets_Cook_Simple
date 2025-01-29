import React from "react";
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";

const DashboardButton = () => {
  return (
    <Link to="/dashboard" className="btn-site">
      <FaUserCog className="max-w-5 max-h-5" />
      <span className="mx-auto pr-4 text-2xl">Dashboard</span>
    </Link>
  );
};

export default DashboardButton;
