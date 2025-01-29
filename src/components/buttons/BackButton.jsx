import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn-site flex items-center gap-2"
      aria-label="Retour"
    >
      <FaArrowLeft /> Retour
    </button>
  )
}

export default BackButton
