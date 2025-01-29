import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const HomeButton = () => {
  return (
    <Link to="/" className="nav-btn">
      <FaHome className="max-w-5 max-h-5" />
      <span className="mx-auto pr-4 text-2xl">Accueil</span>
    </Link>
  )
}

export default HomeButton
