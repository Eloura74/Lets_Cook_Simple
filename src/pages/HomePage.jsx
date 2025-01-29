import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import useRecettes from "../hooks/useRecettes";
import DifficultyStars from "../components/ui/DifficultyStars";

const HomePage = () => {
  // Utilisation de notre hook pour récupérer toutes les recettes
  const { recettes } = useRecettes();

  return (
    <div className="min-h-screen background-principale">
      <Header />

      {/* Section des recettes */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-memoirs text-[#DCD7C9] mb-8 text-center">
          Nos Recettes
        </h2>

        {/* Grille des recettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recettes.map((recette) => (
            <Link
              key={recette.id}
              to={`/recette/${recette.id}`}
              className="bg-[#2C3639]/90 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image de la recette */}
              <div className="relative h-48">
                <img
                  src={recette.imageUrl}
                  alt={recette.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/newRecipes.webp";
                  }}
                />
              </div>

              {/* Contenu de la carte */}
              <div className="p-4">
                <h3 className="text-xl font-memoirs text-[#DCD7C9] mb-2">
                  {recette.title}
                </h3>
                <p className="text-[#DCD7C9]/80 text-sm mb-4 line-clamp-2">
                  {recette.description}
                </p>

                {/* Informations supplémentaires */}
                <div className="flex items-center justify-between text-sm text-[#DCD7C9]/60">
                  <div className="flex items-center gap-2">
                    <DifficultyStars difficulty={recette.difficulty} />
                  </div>
                  <span>{recette.prepTime} min</span>
                </div>

                {/* Statistiques */}
                <div className="mt-4 flex justify-between text-xs text-[#DCD7C9]/40">
                  <span>{recette.views} vues</span>
                  <span>{recette.likes} likes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
