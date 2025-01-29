import React from "react";
import { useParams, Link } from "react-router-dom";
import useRecettes from "../hooks/useRecettes";
import DifficultyStars from "../components/ui/DifficultyStars";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recettes } = useRecettes();
  const recette = recettes.find((r) => r.id === id);

  // Si la recette n'existe pas
  if (!recette) {
    return (
      <div className="min-h-screen background-principale p-4">
        <div className="bg-[#2C3639]/90 rounded-lg p-8 max-w-2xl mx-auto mt-10">
          <h2 className="text-2xl text-[#DCD7C9] text-center">
            Recette non trouvée
          </h2>
          <Link to="/" className="btn-site block text-center mt-4">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen background-principale p-4">
      {/* Carrousel des recettes similaires */}
      <div className="recipe-carousel mx-auto ">
        {recettes.slice(0, 3).map((r) => (
          <Link
            key={r.id}
            to={`/recette/${r.id}`}
            className="flex-shrink-0 w-64 bg-[#2C3639]/90 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative h-40">
              <img
                src={r.imageUrl}
                alt={r.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2">
                <DifficultyStars difficulty={r.difficulty} />
              </div>
            </div>
            <div className="p-2">
              <h3 className="text-[#DCD7C9] text-sm font-semibold line-clamp-2">
                {r.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Détail de la recette */}
      <div className="max-w-4xl mx-auto bg-[#2C3639]/90 rounded-lg overflow-hidden mt-4">
        {/* Image et titre */}
        <div className="recipe-detail-image">
          <img
            src={recette.imageUrl}
            alt={recette.title}
            className="recipe-detail-image img"
          />
          <div className="recipe-detail-gradient" />
          <div className="recipe-detail-title">
            <h1 className="text-4xl text-[#DCD7C9] font-bold mb-2">
              {recette.title}
            </h1>
            <div className="flex gap-4">
              <DifficultyStars difficulty={recette.difficulty} />
            </div>
          </div>
        </div>

        {/* Contenu de la recette */}
        <div className="recipe-detail-section">
          {/* Description */}
          <div>
            <h2 className="recipe-detail-heading">Description</h2>
            <p className="recipe-detail-text">{recette.description}</p>
          </div>

          {/* Ingrédients */}
          <div>
            <h2 className="recipe-detail-heading">Ingrédients</h2>
            <ul className="list-disc pl-6 recipe-detail-text space-y-2">
              {recette.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="recipe-detail-heading">Instructions</h2>
            <ol className="list-decimal pl-6 recipe-detail-text space-y-2">
              {recette.instructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Bouton retour */}
          <div className="text-center pt-4">
            <Link to="/" className="btn-site inline-block">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
