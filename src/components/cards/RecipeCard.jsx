import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaClock } from "react-icons/fa";
import DifficultyStars from "../ui/DifficultyStars";

const RecipeCard = ({ recipe }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Effet de mouvement 3D uniquement sur desktop
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return; // Pas d'effet sur mobile/tablette
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 20) * 0.5; // Réduit l'intensité de la rotation
    const rotateY = ((centerX - x) / 20) * 0.5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <Link
      to={`/recette/${recipe.id}`}
      ref={cardRef}
      className="block w-full transform transition-all duration-300 hover:scale-[1.02]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
    >
      <article
        className="bg-[#2C3639]/90 rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Image Container */}
        <div className="relative w-full pt-[75%]">
          {" "}
          {/* Aspect ratio 4:3 */}
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/newRecipes.webp";
            }}
          />
          {/* Overlay avec le temps de préparation */}
          <div
            className="absolute top-2 right-2 bg-[#A27B5C]/90 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            style={{ transform: "translateZ(20px)" }} // Effet de profondeur
          >
            <FaClock />
            <span>{recipe.prepTime} min</span>
          </div>
        </div>

        {/* Contenu */}
        <div
          className="p-4 flex-grow flex flex-col"
          style={{ transform: "translateZ(10px)" }}
        >
          <h3 className="text-xl font-memoirs text-[#DCD7C9] mb-2 line-clamp-2 titleShadow">
            {recipe.title}
          </h3>

          <p className="text-[#DCD7C9]/80 text-sm mb-4 line-clamp-2 flex-grow">
            {recipe.description}
          </p>

          {/* Niveau de difficulté */}
          <div className="flex items-center gap-2 mb-3">
            <DifficultyStars difficulty={recipe.difficulty} />
          </div>

          {/* Statistiques */}
          <div className="flex items-center justify-between text-sm text-[#DCD7C9]/60">
            <div className="flex items-center gap-2">
              <FaEye className="text-[#A27B5C]" />
              <span>{recipe.views}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-[#A27B5C]" />
              <span>{recipe.likes}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
