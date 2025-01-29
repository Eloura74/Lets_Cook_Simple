import React, { useRef, useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEye, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import DifficultyStars from "../components/ui/DifficultyStars";
import HomeButton from "../components/buttons/HomeButton";
import BackButton from "../components/buttons/BackButton";
import useRecettes from "../hooks/useRecettes";
import Footer from "../components/common/Footer";
const DashboardPage = () => {
  // Référence pour le scroll
  const dashboardRef = useRef(null);

  // Utilisation de notre hook personnalisé
  const { recettes, ajouterRecette, supprimerRecette, getRecettesUtilisateur } =
    useRecettes();

  // État local pour la nouvelle recette
  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: "",
    description: "",
    difficulte: 1,
    tempsPreparation: "",
    ingredients: [""],
    instructions: [""],
    imageUrl: "/images/newRecipes.webp",
  });

  // Récupération du nom d'utilisateur
  const nomUtilisateur = localStorage.getItem("username");

  // Récupération des recettes de l'utilisateur
  const mesRecettes = getRecettesUtilisateur(nomUtilisateur);

  // Statistiques
  const stats = {
    totalRecettes: mesRecettes.length,
  };

  // Effet pour le scroll
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

  // Gestionnaires d'événements
  const ajouterIngredient = () => {
    setNouvelleRecette((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const ajouterInstruction = () => {
    setNouvelleRecette((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !nouvelleRecette.titre?.trim() ||
      !nouvelleRecette.description?.trim()
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newId = Date.now().toString();
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre,
      description: nouvelleRecette.description,
      difficulty: nouvelleRecette.difficulte,
      prepTime: parseInt(nouvelleRecette.tempsPreparation),
      imageUrl: nouvelleRecette.imageUrl,
      ingredients: nouvelleRecette.ingredients.filter((i) => i?.trim() !== ""),
      instructions: nouvelleRecette.instructions.filter(
        (i) => i?.trim() !== ""
      ),
      likes: 0,
      views: 0,
      category: "Plat principal",
      author: nomUtilisateur,
      createdAt: new Date().toISOString(),
    };

    // Utilisation de la fonction du hook pour ajouter la recette
    ajouterRecette(recetteFormatee);

    // Réinitialisation du formulaire
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

  const handleSupprimer = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      supprimerRecette(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C3639]/90 p-4 md:p-8" ref={dashboardRef}>
      {/* En-tête */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-memoirs text-[#DCD7C9]">
            Tableau de bord
          </h1>
          <div className="flex gap-4">
            <HomeButton />
            <BackButton />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne de gauche - Création de recette */}
        <section className="bg-[#2C3639] rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-6 pb-2 border-b border-[#A27B5C]/30">
            Créer une nouvelle recette
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium">
                Titre de la recette
              </label>
              <input
                type="text"
                className="w-full bg-[#3F4E4F] border border-[#A27B5C]/30 rounded-lg p-2 text-[#DCD7C9] focus:outline-none focus:border-[#A27B5C]"
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
              <label className="block text-[#DCD7C9] text-sm font-medium">
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
              <label className="block text-[#DCD7C9] text-sm font-medium">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                className="w-full bg-[#3F4E4F] border border-[#A27B5C]/30 rounded-lg p-2 text-[#DCD7C9] focus:outline-none focus:border-[#A27B5C]"
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
              <label className="block text-[#DCD7C9] text-sm font-medium">
                Description
              </label>
              <textarea
                className="w-full bg-[#3F4E4F] border border-[#A27B5C]/30 rounded-lg p-2 text-[#DCD7C9] focus:outline-none focus:border-[#A27B5C] min-h-[100px]"
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
              <label className="block text-[#DCD7C9] text-sm font-medium">
                Ingrédients
              </label>
              {nouvelleRecette.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full bg-[#3F4E4F] border border-[#A27B5C]/30 rounded-lg p-2 text-[#DCD7C9] focus:outline-none focus:border-[#A27B5C] mb-2"
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
                className="flex items-center gap-2 text-[#A27B5C] hover:text-[#DCD7C9] transition-colors"
              >
                <FaPlus /> Ajouter un ingrédient
              </button>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label className="block text-[#DCD7C9] text-sm font-medium">
                Instructions
              </label>
              {nouvelleRecette.instructions.map((instruction, index) => (
                <textarea
                  key={index}
                  className="w-full bg-[#3F4E4F] border border-[#A27B5C]/30 rounded-lg p-2 text-[#DCD7C9] focus:outline-none focus:border-[#A27B5C] mb-2 min-h-[80px]"
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
                className="flex items-center gap-2 text-[#A27B5C] hover:text-[#DCD7C9] transition-colors"
              >
                <FaPlus /> Ajouter une instruction
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#A27B5C] text-[#DCD7C9] py-3 rounded-lg hover:bg-[#A27B5C]/80 transition-colors font-medium"
            >
              Créer la recette
            </button>
          </form>
        </section>

        {/* Colonne de droite - Mes recettes */}
        <section className="bg-[#2C3639] rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-memoirs text-[#DCD7C9]">
              Mes recettes récentes
            </h2>
            <span className="text-[#DCD7C9] text-sm">
              Total : {stats.totalRecettes} recettes
            </span>
          </div>

          <div className="space-y-4">
            {mesRecettes.map((recette) => (
              <div
                key={recette.id}
                className="bg-[#3F4E4F] rounded-lg p-4 flex items-center gap-4"
              >
                <img
                  src={recette.imageUrl}
                  alt={recette.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-[#DCD7C9] font-medium">
                    {recette.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-[#DCD7C9]/60">
                    <span>{recette.prepTime} min</span>
                    <span>{recette.views} vues</span>
                    <span>{recette.likes} likes</span>
                  </div>
                  <DifficultyStars difficulty={recette.difficulty} />
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/recipe/${recette.id}`}
                    className="p-2 text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
                  >
                    <FaEye />
                  </Link>
                  <button
                    onClick={() => handleSupprimer(recette.id)}
                    className="p-2 text-[#DCD7C9] hover:text-red-500 transition-colors"
                  >
                    <FaTrash />
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
