import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useRecettes from "../../hooks/useRecettes";

const SearchBar = () => {
  const [recherche, setRecherche] = useState("");
  const [resultatVisible, setResultatVisible] = useState(false);
  const { recettes } = useRecettes();
  const searchRef = useRef(null);

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
    <div className="relative w-full max-w-md mx-auto px-4" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher..."
          value={recherche}
          onChange={(e) => {
            setRecherche(e.target.value);
            setResultatVisible(e.target.value.trim().length > 0);
          }}
          className="w-full p-2 pl-10 
                   bg-[#2C3639]/90
                   rounded-lg
                   text-[#DCD7C9] text-sm
                   placeholder-[#DCD7C9]/70
                   focus:outline-none focus:ring-1 focus:ring-[#A27B5C]
                   border border-[#DCD7C9]/10"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DCD7C9]/70" />
      </div>

      {resultatVisible && recettesFiltrees.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#2C3639]/95 rounded-lg border border-[#DCD7C9]/10">
          <ul>
            {recettesFiltrees.map((recette) => (
              <li key={recette.id}>
                <Link
                  to={`/recette/${recette.id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#A27B5C]/20"
                  onClick={() => {
                    setResultatVisible(false);
                    setRecherche("");
                  }}
                >
                  <img
                    src={recette.imageUrl}
                    alt={recette.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[#DCD7C9] text-sm">{recette.title}</p>
                    <div className="flex items-center gap-2 text-xs text-[#DCD7C9]/70">
                      <span>❤️ {recette.likes}</span>
                      <span>👁️ {recette.views}</span>
                    </div>
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
