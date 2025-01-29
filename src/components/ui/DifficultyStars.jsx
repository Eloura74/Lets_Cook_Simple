import React from 'react'
import { FaStar } from 'react-icons/fa'

const DifficultyStars = ({ difficulty = 1, onChange, interactive = false }) => {
  const totalStars = 3
  const stars = Array.from({ length: totalStars }, (_, index) => index + 1)

  return (
    <div className="flex gap-2">
      {stars.map(star => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onChange(star)}
          className={`text-2xl transition-colors duration-200 ${
            interactive ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          <FaStar
            className={`${
              star <= difficulty
                ? 'text-[#A27B5C]'
                : 'text-[#DCD7C9]/20'
            } hover:text-[#A27B5C] transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  )
}

export default DifficultyStars
