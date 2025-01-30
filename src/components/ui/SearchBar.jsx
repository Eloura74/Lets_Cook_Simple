import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import DifficultyStars from "../ui/DifficultyStars";
import useRecettes from "../../hooks/useRecettes";

const SearchBar = () => {
  const [recherche, setRecherche] = useState(""); // État pour la recherche
  const [resultatVisible, setResultatVisible] = useState(false); // État pour le visuel
  const { recettes } = useRecettes(); // Récupérer les recettes
  const searchRef = useRef(null); // Récupérer la reference

  // Normaliser le texte (enlever accents et mettre en minuscule)
  const normaliserTexte = (texte) => {
    if (!texte) return "";
    return texte
      .toLowerCase() // Mettre en minuscule
      .normalize("NFD") // Normaliser (enlever accents)
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les accents
  };

  // Filtrer les recettes
  const recettesFiltrees = recettes
    .filter((recette) => {
      if (!recherche.trim()) return false;
      return normaliserTexte(recette.title).includes(
        normaliserTexte(recherche)
      );
    })
    .slice(0, 5);

  // Fermer les résultats au clic extérieur
  useEffect(() => {
    const fermerResultats = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResultatVisible(false);
      }
    };
    document.addEventListener("mousedown", fermerResultats); // Ajouter l'écouteur d'évenement
    return () => document.removeEventListener("mousedown", fermerResultats); // Supprimer l'écouteur
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative ">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={recherche}
          onChange={(e) => {
            setRecherche(e.target.value);
            setResultatVisible(e.target.value.trim().length > 0);
          }}
          className="w-full p-4 pl-12 
                   bg-black/20 backdrop-blur-sm
                   rounded-full
                   text-[#DCD7C9] text-sm sm:text-base
                   placeholder-[#DCD7C9]/70
                   focus:outline-none focus:ring-2 focus:ring-[#DCD7C9]/50
                   shadow-xl shadow-[#DCD7C9]/60
                   border border-[#DCD7C9]/10"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
      </div>

      {/* Liste des résultats */}
      {resultatVisible && recettesFiltrees.length > 0 && (
        <div
          className="absolute z-50 w-full mt-2 bg-[#2C3639]/95 backdrop-blur-sm 
                      rounded-2xl shadow-xl border border-[#DCD7C9]/10 overflow-hidden"
        >
          <ul className="py-2">
            {recettesFiltrees.map((recette) => (
              <li key={recette.id}>
                <Link
                  to={`/recette/${recette.id}`}
                  className="flex items-center px-4 py-2 hover:bg-[#A27B5C]/20 transition-colors"
                  onClick={() => {
                    setResultatVisible(false);
                    setRecherche("");
                  }}
                >
                  <img
                    src={recette.imageUrl}
                    alt={recette.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="ml-3 text-[#DCD7C9] flex items-center gap-2">
                    <span className="font-medium">{recette.title}</span>
                    <span className="text-[#DCD7C9]/50">|</span>
                    <span className="text-red-400">❤️ {recette.likes}</span>
                    <span className="text-[#DCD7C9]/50">|</span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-blue-400 w-4 h-4" />
                      {recette.views}
                    </span>
                    <span className="text-[#DCD7C9]/50">|</span>
                    <DifficultyStars difficulty={recette.difficulty} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
