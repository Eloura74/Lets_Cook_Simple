import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const HomeButton = () => {
  const location = useLocation();
  const isActive = location.pathname === '/';

  return (
    <Link to="/" className={`btn-site group ${isActive ? 'active' : ''}`}>
      <FaHome />
      <span>Accueil</span>
    </Link>
  )
}

export default HomeButton
