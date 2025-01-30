import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useRecettes from "../../hooks/useRecettes";

/**
 * Composant SearchBar - Barre de recherche intelligente pour les recettes
 * 
 * Fonctionnalités :
 * - Recherche en temps réel avec affichage des résultats
 * - Normalisation du texte (suppression des accents, casse)
 * - Affichage des 5 premiers résultats avec image et statistiques
 * - Fermeture automatique au clic extérieur
 */
const SearchBar = () => {
  // État pour stocker la valeur de recherche
  const [recherche, setRecherche] = useState("");
  
  // État pour contrôler la visibilité des résultats
  const [resultatVisible, setResultatVisible] = useState(false);
  
  // Récupération des recettes depuis notre hook personnalisé
  const { recettes } = useRecettes();
  
  // Référence pour gérer les clics extérieurs
  const searchRef = useRef(null);

  /**
   * Normalise le texte pour la recherche :
   * - Conversion en minuscules
   * - Suppression des accents
   * - Gestion des cas particuliers (texte vide)
   * 
   * @param {string} texte - Le texte à normaliser
   * @returns {string} Le texte normalisé
   */
  const normaliserTexte = (texte) => {
    if (!texte) return "";
    return texte
      .toLowerCase() // Mettre en minuscule
      .normalize("NFD") // Normaliser (enlever accents)
      .replace(/[\u0300-\u036f]/g, ""); // Enlever les accents
  };

  /**
   * Filtrage des recettes basé sur la recherche
   * - Vérifie si la recherche n'est pas vide
   * - Compare les titres normalisés
   * - Limite à 5 résultats maximum
   */
  const recettesFiltrees = recettes
    .filter((recette) => {
      if (!recherche.trim()) return false;
      return normaliserTexte(recette.title).includes(
        normaliserTexte(recherche)
      );
    })
    .slice(0, 5);

  /**
   * Effet pour gérer la fermeture des résultats au clic extérieur
   * Utilise une référence pour détecter si le clic est en dehors du composant
   */
  useEffect(() => {
    const fermerResultats = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResultatVisible(false);
      }
    };
    
    // Ajout de l'écouteur d'événement au montage
    document.addEventListener("mousedown", fermerResultats);
    
    // Nettoyage de l'écouteur au démontage
    return () => document.removeEventListener("mousedown", fermerResultats);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto px-4" ref={searchRef}>
      {/* Conteneur de la barre de recherche */}
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
        {/* Icône de recherche */}
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DCD7C9]/70" />
      </div>

      {/* Liste des résultats de recherche */}
      {resultatVisible && recettesFiltrees.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#2C3639]/95 rounded-lg border border-[#DCD7C9]/10">
          <ul>
            {recettesFiltrees.map((recette) => (
              <li key={recette.id}>
                <Link
                  to={`/recette/${recette.id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#A27B5C]/20"
                  onClick={() => {
                    setResultatVisible(false); // Ferme les résultats
                    setRecherche("");         // Réinitialise la recherche
                  }}
                >
                  {/* Miniature de la recette */}
                  <img
                    src={recette.imageUrl}
                    alt={recette.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  {/* Informations de la recette */}
                  <div className="flex-1">
                    <p className="text-[#DCD7C9] text-sm">{recette.title}</p>
                    {/* Statistiques de la recette */}
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
