import React, { useRef, useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaEye, FaClipboardList } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DifficultyStars from '../components/ui/DifficultyStars'
import HomeButton from '../components/buttons/HomeButton'
import BackButton from '../components/buttons/BackButton'
import useRecettes from '../hooks/useRecettes'

const DashboardPage = () => {
  // Référence pour le scroll
  const dashboardRef = useRef(null)

  // Utilisation de notre hook personnalisé
  const { recettes, ajouterRecette, supprimerRecette, getRecettesUtilisateur } = useRecettes()

  // État local pour la nouvelle recette
  const [nouvelleRecette, setNouvelleRecette] = useState({
    titre: '',
    description: '',
    difficulte: 1,
    tempsPreparation: '',
    ingredients: [''],
    instructions: [''],
    imageUrl: '/images/newRecipes.webp',
  })

  // Récupération du nom d'utilisateur
  const nomUtilisateur = localStorage.getItem('username')

  // Récupération des recettes de l'utilisateur
  const mesRecettes = getRecettesUtilisateur(nomUtilisateur)

  // Statistiques
  const stats = {
    totalRecettes: mesRecettes.length,
  }

  // Effet pour le scroll
  useEffect(() => {
    if (dashboardRef.current) {
      const yOffset = -30
      const element = dashboardRef.current
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      })
    }
  }, [])

  // Gestionnaires d'événements
  const ajouterIngredient = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ''],
    }))
  }

  const ajouterInstruction = () => {
    setNouvelleRecette(prev => ({
      ...prev,
      instructions: [...prev.instructions, ''],
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!nouvelleRecette.titre?.trim() || !nouvelleRecette.description?.trim()) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const newId = Date.now().toString()
    const recetteFormatee = {
      id: newId,
      title: nouvelleRecette.titre,
      description: nouvelleRecette.description,
      difficulty: nouvelleRecette.difficulte,
      prepTime: parseInt(nouvelleRecette.tempsPreparation),
      imageUrl: nouvelleRecette.imageUrl,
      ingredients: nouvelleRecette.ingredients.filter(i => i?.trim() !== ''),
      instructions: nouvelleRecette.instructions.filter(i => i?.trim() !== ''),
      likes: 0,
      views: 0,
      category: 'Plat principal',
      author: nomUtilisateur,
      createdAt: new Date().toISOString(),
    }

    // Utilisation de la fonction du hook pour ajouter la recette
    ajouterRecette(recetteFormatee)

    // Réinitialisation du formulaire
    setNouvelleRecette({
      titre: '',
      description: '',
      difficulte: 1,
      tempsPreparation: '',
      ingredients: [''],
      instructions: [''],
      imageUrl: '/images/newRecipes.webp',
    })
  }

  const handleSupprimer = id => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      supprimerRecette(id)
    }
  }

  return (
    <div className="space-y-8 w-full" ref={dashboardRef}>
      {/* En-tête */}
      <header className="flex items-center flex-col bg-[#2C3639]/25 rounded-4xl shadow-lg shadow-[#4A403A]">
        <div>
          <h1 className="text-5xl font-memoirs text-[#DCD7C9] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.8)] mt-6">
            Tableau de bord
          </h1>
        </div>
        <div className="flex items-center gap-17 p-14 pb-8">
          <div className="w-32">
            <HomeButton />
          </div>
          <div className="w-32 flex justify-end">
            <BackButton />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne de gauche - Création de recette */}
        <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-xl shadow-[#4A403A]/90 space-y-6">
          <h2 className="text-3xl text-center font-memoirs text-[#DCD7C9] border-t border-[#A27B5C]/60 border-b border-[#A27B5C] pb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
            Créer une nouvelle recette
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Titre */}
            <div>
              <label className="title-dashboard-create">
                Titre de la recette
              </label>
              <input
                type="text"
                className="inputDashboard"
                value={nouvelleRecette.titre}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    titre: e.target.value,
                  }))
                }
              />
            </div>

            {/* Difficulté */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">Difficulté</label>
              <p className="text-[#DCD7C9]/50 text-xs pl-6 mb-2">
                Sélectionnez une difficulté en cliquant sur les étoiles
              </p>
              <div className="w-full flex justify-center bg-transparent">
                <DifficultyStars
                  difficulty={nouvelleRecette.difficulte}
                  onChange={niveau =>
                    setNouvelleRecette(prev => ({
                      ...prev,
                      difficulte: niveau,
                    }))
                  }
                  interactive={true}
                />
              </div>
            </div>

            {/* Temps de préparation */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                className="inputDashboard"
                value={nouvelleRecette.tempsPreparation}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    tempsPreparation: e.target.value,
                  }))
                }
              />
            </div>

            {/* Image URL */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">URL de l'image</label>
              <input
                type="text"
                className="inputDashboard"
                placeholder="URL de l'image"
                value={nouvelleRecette.imageUrl}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
              />
              <p className="text-[#DCD7C9]/50 text-sm mt-1">
                Ne pas modifier pour utiliser l'image par défaut
              </p>
            </div>

            {/* Aperçu de l'image */}
            <div>
              <label className="title-dashboard-create text-center">
                Aperçu de l'image
              </label>
              <div className="relative w-full h-48 bg-[#3F4E4F] rounded-lg overflow-hidden shadow-xl shadow-[#4A403A]/90">
                <img
                  src={nouvelleRecette.imageUrl}
                  alt="Aperçu"
                  className="img-cover"
                  onError={e => {
                    e.target.onerror = null
                    e.target.src = '/images/newRecipes.webp'
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">Description</label>
              <textarea
                className="inputDashboard min-h-[100px]"
                value={nouvelleRecette.description}
                onChange={e =>
                  setNouvelleRecette(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            {/* Ingrédients */}
            <div className="border-t border-[#A27B5C] pt-2">
              <label className="title-dashboard-create">Ingrédients</label>
              <div className="space-y-2">
                {nouvelleRecette.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="inputDashboard"
                    value={ingredient}
                    onChange={e => {
                      const newIngredients = [...nouvelleRecette.ingredients]
                      newIngredients[index] = e.target.value
                      setNouvelleRecette(prev => ({
                        ...prev,
                        ingredients: newIngredients,
                      }))
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={ajouterIngredient}
                  className="btn-site flex items-center gap-2"
                >
                  <FaPlus /> Ajouter un ingrédient
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-t border-[#A27B5C] pt-2 pb-6 border-b border-[#A27B5C]">
              <label className="title-dashboard-create text-center">
                Instructions
              </label>
              <div className="space-y-2">
                {nouvelleRecette.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex-center bg-[#A27B5C] rounded-full text-[#DCD7C9] text-sm">
                      {index + 1}
                    </span>
                    <textarea
                      className="flex-grow bg-[#3F4E4F] text-[#DCD7C9] rounded-lg p-2 border border-[#DCD7C9]/10 focus:border-[#A27B5C] focus:ring-1 focus:ring-[#A27B5C] outline-none min-h-[60px] inputDashboard"
                      value={instruction}
                      onChange={e => {
                        const newInstructions = [...nouvelleRecette.instructions]
                        newInstructions[index] = e.target.value
                        setNouvelleRecette(prev => ({
                          ...prev,
                          instructions: newInstructions,
                        }))
                      }}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={ajouterInstruction}
                  className="btn-site flex items-center gap-2"
                >
                  <FaPlus /> Ajouter une instruction
                </button>
              </div>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="btn-site flex items-center gap-2 justify-center w-full"
            >
              Créer la recette
            </button>
          </form>
        </section>

        {/* Colonne de droite */}
        <div className="space-y-8">
          {/* Liste des recettes */}
          <section className="bg-[#2C3639]/95 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-6">
            <h2 className="text-3xl text-center font-memoirs text-[#DCD7C9] border-t border-[#A27B5C]/60 border-b border-[#A27B5C] pb-2 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
              Mes recettes récentes
            </h2>

            {/* Total des recettes */}
            <div className="flex items-center justify-center w-fit mx-auto flex-wrap gap-3 p-4 rounded-full border-b border-[#A27B5C]/60 pb-2">
              <FaClipboardList className="w-6 h-6 text-[#DCD7C9]" />
              <span className="text-[#DCD7C9] text-lg">
                Total : {stats.totalRecettes} recettes
              </span>
            </div>

            {/* Liste des recettes */}
            <div className="space-y-4">
              {mesRecettes.map(recette => (
                <div
                  key={recette.id}
                  className="bg-[#3F4E4F] rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-memoirs text-[#DCD7C9]">
                        {recette.title}
                      </h3>
                      <p className="text-[#DCD7C9]/80 text-sm mt-1">
                        {recette.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-[#DCD7C9]/60 text-sm">
                        <span>{recette.prepTime} min</span>
                        <span>{recette.views} vues</span>
                        <span>{recette.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/recette/${recette.id}`}
                        className="p-2 text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
                      >
                        <FaEye />
                      </Link>
                      <button
                        onClick={() => handleSupprimer(recette.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
