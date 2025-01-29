import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import RecipeCard from "../components/cards/RecipeCard";
import Filtres from "../components/filters/Filtres";
import useRecettes from "../hooks/useRecettes";

const HomePage = () => {
  const { recettes: recettesInitiales } = useRecettes();
  const [recettesFiltrees, setRecettesFiltrees] = useState([]);

  // Initialiser les recettes au démarrage
  useEffect(() => {
    setRecettesFiltrees(recettesInitiales);
  }, [recettesInitiales]);

  // Fonction pour gérer le filtrage des recettes
  const gererFiltrage = (fonctionTri) => {
    const nouvellesRecettes = fonctionTri(recettesInitiales);
    setRecettesFiltrees(nouvellesRecettes);
  };

  return (
    <div className="min-h-screen background-principale">
      <Header />

      {/* Filtres */}
      <Filtres onFiltrer={gererFiltrage} />

      {/* Section des recettes */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-memoirs text-[#DCD7C9] mb-8 text-center">
          Nos Recettes
        </h2>

        {/* Grille responsive des recettes */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1920px] mx-auto">
          {recettesFiltrees.map((recette) => (
            <RecipeCard key={recette.id} recipe={recette} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
