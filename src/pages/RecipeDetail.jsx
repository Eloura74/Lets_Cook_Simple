import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useRecettes from '../hooks/useRecettes'
import DifficultyStars from '../components/ui/DifficultyStars'
import BackButton from '../components/buttons/BackButton'

const RecipeDetail = () => {
  // Récupération de l'ID depuis l'URL
  const { id } = useParams()
  
  // Utilisation de notre hook pour récupérer la recette
  const { getRecetteById } = useRecettes()
  const recette = getRecetteById(id)

  // Si la recette n'est pas trouvée
  if (!recette) {
    return (
      <div className="min-h-screen background-principale flex flex-col items-center justify-center p-4">
        <div className="bg-[#2C3639]/90 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4">
            Recette non trouvée
          </h2>
          <p className="text-[#DCD7C9]/80 mb-6">
            Désolé, cette recette n'existe pas ou a été supprimée.
          </p>
          <Link to="/" className="btn-site">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen background-principale">
      {/* En-tête */}
      <header className="bg-[#2C3639]/25 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <BackButton />
          </div>
          <h1 className="text-4xl font-memoirs text-[#DCD7C9] text-center">
            {recette.title}
          </h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-[#2C3639]/90 rounded-lg shadow-xl overflow-hidden">
          {/* Image de la recette */}
          <div className="relative h-96">
            <img
              src={recette.imageUrl}
              alt={recette.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/newRecipes.webp'
              }}
            />
          </div>

          {/* Informations de la recette */}
          <div className="p-6">
            {/* En-tête avec difficulté et temps */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <DifficultyStars difficulty={recette.difficulty} />
              </div>
              <span className="text-[#DCD7C9]">{recette.prepTime} minutes</span>
            </div>

            {/* Description */}
            <p className="text-[#DCD7C9]/80 mb-8">{recette.description}</p>

            {/* Ingrédients */}
            <div className="mb-8">
              <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4">
                Ingrédients
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {recette.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-[#DCD7C9]/80">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-memoirs text-[#DCD7C9] mb-4">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recette.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 flex-center bg-[#A27B5C] rounded-full text-[#DCD7C9]">
                      {index + 1}
                    </span>
                    <p className="text-[#DCD7C9]/80 flex-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-8 pt-6 border-t border-[#A27B5C]/20">
              <div className="flex justify-between text-sm text-[#DCD7C9]/60">
                <span>Par {recette.author}</span>
                <div className="flex gap-4">
                  <span>{recette.views} vues</span>
                  <span>{recette.likes} likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecipeDetail
