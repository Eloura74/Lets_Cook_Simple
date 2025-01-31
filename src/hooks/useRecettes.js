import { useState, useEffect } from "react";
import recettesData from "../data/recettes.json";

const useRecettes = () => {
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    // Charger les recettes de base et personnalisées
    const recettesPerso = JSON.parse(
      localStorage.getItem("recettesPerso") || "[]"
    );
    setRecettes([...recettesData, ...recettesPerso]);
  }, []);
  // ______________________________________________________________________________
  // Ajouter une nouvelle recette
  const ajouterRecette = (nouvelleRecette) => {
    // Récupérer les recettes existantes
    const recettesPerso = JSON.parse(
      localStorage.getItem("recettesPerso") || "[]"
    );
    // Ajouter la nouvelle recette avec un ID unique
    const recetteComplete = {
      ...nouvelleRecette,
      id: String(Date.now()),
    };
    // ______________________________________________________________________________
    // Sauvegarder dans localStorage
    const nouvelleListe = [...recettesPerso, recetteComplete]; // Ajouter la nouvelle recette en utilisant la methode spread
    localStorage.setItem("recettesPerso", JSON.stringify(nouvelleListe)); // Sauvegarder les recettes personnalisées dans le localStorage
    // Mettre à jour l'état
    setRecettes((prev) => [...prev, recetteComplete]);
  };
  // ______________________________________________________________________________
  // supprimer une recette
  const supprimerRecette = (id) => {
    // Récupérer les recettes existantes
    const recettesPerso = JSON.parse(
      localStorage.getItem("recettesPerso") || "[]"
    );

    // filtrer les rectte en fonction de l'id
    const recettesMaj = recettesPerso.filter((recette) => recette.id !== id);

    // Supprimer la recette
    localStorage.setItem("recettesPerso", JSON.stringify(recettesMaj));

    // Mettre à jour l'état
    setRecettes((prevState) =>
      prevState.filter((recette) => recette.id !== id)
    );
  };
  // ______________________________________________________________________________
  // Récupérer les recettes d'un utilisateur
  const getRecettesUtilisateur = (username) => {
    if (!username) return [];
    return recettes.filter((recette) => recette.author === username);
  };

  return { recettes, ajouterRecette, getRecettesUtilisateur, supprimerRecette };
};

export default useRecettes;
