import React, { useRef, useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import DifficultyStars from "../components/ui/DifficultyStars";
import HomeButton from "../components/buttons/HomeButton";
import BackButton from "../components/buttons/BackButton";
import useRecettes from "../hooks/useRecettes";
import Footer from "../components/common/Footer";

/**
 * Composant DashboardPage - Page principale du tableau de bord utilisateur
 * Permet la gestion des recettes personnelles (création, visualisation, suppression)
 */
const DashboardPage = () => {
  // Référence pour gérer le défilement automatique de la page
  const dashboardRef = useRef(null);

  // Récupération des fonctions de gestion des recettes depuis notre hook personnalisé
  const { ajouterRecette, supprimerRecette, getRecettesUtilisateur } =
    useRecettes();

  /**
   * État initial d'une nouvelle recette avec ses propriétés par défaut
   * Utilisé pour le formulaire de création de recette
   */
  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: "",
    description: "",
    difficulte: 1,
    tempsPreparation: "",
    ingredients: [""],
    instructions: [""],
    imageUrl: "/images/newRecipes.webp",
  });

  // Récupération de l'identifiant de l'utilisateur depuis le stockage local
  const nomUtilisateur = localStorage.getItem("username");

  // Obtention de la liste des recettes créées par l'utilisateur
  const mesRecettes = getRecettesUtilisateur(nomUtilisateur);

  // Calcul des statistiques de l'utilisateur
  const stats = {
    totalRecettes: mesRecettes.length,
  };

  /**
   * Effet pour gérer le défilement automatique
   * Ajuste la position de défilement avec un décalage de 30px vers le haut
   */
  useEffect(() => {
    if (dashboardRef.current) {
      const yOffset = -30;
      const element = dashboardRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, []);

  /**
   * Fonction pour ajouter un nouvel ingrédient vide à la liste
   * Utilisée par le bouton d'ajout d'ingrédient
   */
  const ajouterIngredient = () => {
    setNouvelleRecette((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  /**
   * Fonction pour ajouter une nouvelle instruction vide à la liste
   * Utilisée par le bouton d'ajout d'instruction
   */
  const ajouterInstruction = () => {
    setNouvelleRecette((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  /**
   * Gestion de la soumission du formulaire de création de recette
   * Vérifie la validité des données et formate la recette avant l'ajout
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (
      !nouvelleRecette.titre?.trim() ||
      !nouvelleRecette.description?.trim()
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Création d'un identifiant unique basé sur le timestamp
    const newId = Date.now().toString();

    // Formatage de la recette pour le stockage
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre,
      description: nouvelleRecette.description,
      difficulty: nouvelleRecette.difficulte,
      prepTime: parseInt(nouvelleRecette.tempsPreparation),
      imageUrl: nouvelleRecette.imageUrl,
      // Suppression des espaces avant et après
      ingredients: nouvelleRecette.ingredients.filter((i) => i?.trim() !== ""),
      // Suppression des espaces avant et après
      instructions: nouvelleRecette.instructions.filter(
        (i) => i?.trim() !== ""
      ),
      likes: 0,
      views: 0,
      category: "Plat principal",
      author: nomUtilisateur,
      createdAt: new Date().toISOString(),
    };

    // Ajout de la nouvelle recette
    ajouterRecette(recetteFormatee);

    // Réinitialisation du formulaire après l'ajout
    setNouvelleRecette({
      titre: "",
      description: "",
      difficulte: 1,
      tempsPreparation: "",
      ingredients: [""],
      instructions: [""],
      imageUrl: "/images/newRecipes.webp",
    });
  };

  /**
   * Gestion de la suppression d'une recette
   * Demande confirmation avant la suppression
   * @param {string} id - L'identifiant de la recette à supprimer
   */
  const handleSupprimer = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      supprimerRecette(id);
    }
  };

  return (
    <div
      className="min-h-screen background-principale shadow-[#4A403A] shadow-2xl rounded-xl p-4 md:p-8"
      ref={dashboardRef}
    >
      {/* En-tête */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-memoirs mx-auto text-[#DCD7C9] titleShadow">
            Tableau de bord
          </h1>
        </div>
        <hr className="mt-8 pt-8 border-t border-[#A27B5C] text-center" />
        <div className="flex gap-4 justify-end">
          <HomeButton />
          <BackButton />
        </div>
      </header>
      {/* ____________________________________________________________________________ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* Colonne de gauche - Création de recette */}
        <section className="bg-[#2C3639] rounded-xl p-6 shadow-lg shadow-orange-900/50">
          <h2 className="text-2xl font-memoirs text-[#DCD7C9] titleShadow mb-6 pb-2 border-b border-[#A27B5C]/30">
            Créer une nouvelle recette
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm titleShadow font-medium">
                Titre de la recette
              </label>
              <input
                type="text"
                className="inputStyle "
                value={nouvelleRecette.titre}
                onChange={(e) =>
                  setNouvelleRecette((prev) => ({
                    ...prev,
                    titre: e.target.value,
                  }))
                }
              />
            </div>

            {/* Difficulté */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium titleShadow">
                Difficulté
              </label>
              <div className="flex items-center">
                <DifficultyStars
                  difficulty={nouvelleRecette.difficulte}
                  onChange={(niveau) =>
                    setNouvelleRecette((prev) => ({
                      ...prev,
                      difficulte: niveau,
                    }))
                  }
                  interactive={true}
                />
              </div>
            </div>

            {/* Temps de préparation */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium titleShadow">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                className="inputStyle"
                value={nouvelleRecette.tempsPreparation}
                onChange={(e) =>
                  setNouvelleRecette((prev) => ({
                    ...prev,
                    tempsPreparation: e.target.value,
                  }))
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium  titleShadow">
                Description
              </label>
              <textarea
                className="inputStyle min-h-[100px]"
                value={nouvelleRecette.description}
                onChange={(e) =>
                  setNouvelleRecette((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Ingrédients */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium titleShadow">
                Ingrédients
              </label>
              {nouvelleRecette.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  className="inputStyle mb-2"
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...nouvelleRecette.ingredients];
                    newIngredients[index] = e.target.value;
                    setNouvelleRecette((prev) => ({
                      ...prev,
                      ingredients: newIngredients,
                    }));
                  }}
                />
              ))}
              <button
                type="button"
                onClick={ajouterIngredient}
                className="flex items-center gap-2 text-[#A27B5C] hover:text-[#DCD7C9] transition-colors titleShadow  border border-[#A27B5C] p-2 rounded-lg"
              >
                <FaPlus /> Ajouter un ingrédient
              </button>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium titleShadow">
                Instructions
              </label>
              {nouvelleRecette.instructions.map((instruction, index) => (
                <textarea
                  key={index}
                  className="inputStyle mb-2 min-h-[80px]"
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...nouvelleRecette.instructions];
                    newInstructions[index] = e.target.value;
                    setNouvelleRecette((prev) => ({
                      ...prev,
                      instructions: newInstructions,
                    }));
                  }}
                />
              ))}
              <button
                type="button"
                onClick={ajouterInstruction}
                className="flex items-center gap-2 text-[#A27B5C] hover:text-[#DCD7C9] transition-colors titleShadow border border-[#A27B5C] p-2 rounded-lg"
              >
                <FaPlus /> Ajouter une instruction
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#A27B5C] text-[#DCD7C9] py-3 rounded-lg hover:bg-[#A27B5C]/80 transition-colors font-medium titleShadow shadow-md shadow-gray-900/50"
            >
              Créer la recette
            </button>
          </form>
        </section>
        {/* ____________________________________________________________________________ */}
        {/* Colonne de droite - Mes recettes */}
        <section className="bg-[#2C3639] rounded-xl p-6 shadow-lg shadow-orange-900/50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <h2 className="text-2xl font-memoirs text-[#DCD7C9] titleShadow">
              Mes recettes récentes
            </h2>
            <span className="text-[#DCD7C9] text-sm titleShadow">
              Total : {stats.totalRecettes} recettes
            </span>
          </div>

          <div className="space-y-4">
            {mesRecettes.map((recette) => (
              <div
                key={recette.id}
                className="bg-[#3F4E4F] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={recette.imageUrl}
                  alt={recette.title}
                  className="w-full sm:w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-[#DCD7C9] font-medium mb-2">
                    {recette.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-[#DCD7C9]/60">
                    <span>{recette.prepTime} min</span>
                    <span>{recette.views} vues</span>
                    <span>{recette.likes} likes</span>
                  </div>
                  <div className="mt-2">
                    <DifficultyStars difficulty={recette.difficulty} />
                  </div>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-end">
                  <Link
                    to={`/recette/${recette.id}`}
                    className="p-2 text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
                  >
                    <FaEye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleSupprimer(recette.id)}
                    className="p-2 text-[#DCD7C9] hover:text-red-500 transition-colors"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
