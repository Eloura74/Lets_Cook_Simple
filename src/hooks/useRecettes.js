import { useState, useEffect } from 'react'
import recettesData from '../data/recettes.json'

const useRecettes = () => {
  // État local pour stocker toutes les recettes (base + personnalisées)
  const [recettes, setRecettes] = useState([])

  // Chargement initial des recettes lors du montage du composant
  useEffect(() => {
    // On récupère d'abord les recettes de base du fichier JSON
    // On s'assure que chaque recette a un ID de type string
    const recettesDeBase = recettesData.map(recette => ({
      ...recette,
      id: String(recette.id)
    }))

    // Récupération des recettes personnalisées du localStorage
    const recettesPerso = JSON.parse(localStorage.getItem('recettesPerso') || '[]')

    // On combine les deux sources de recettes
    // Les recettes personnalisées sont ajoutées après pour éviter les conflits d'ID
    const toutesLesRecettes = [...recettesDeBase, ...recettesPerso]
    
    // Mise à jour de l'état avec toutes les recettes
    setRecettes(toutesLesRecettes)
  }, [])

  // Fonction pour ajouter une nouvelle recette
  const ajouterRecette = (nouvelleRecette) => {
    // On récupère les recettes personnalisées existantes
    const recettesPerso = JSON.parse(localStorage.getItem('recettesPerso') || '[]')
    
    // On s'assure que l'ID est unique en utilisant un timestamp
    const recetteAvecId = {
      ...nouvelleRecette,
      id: String(Date.now()) // Conversion en string pour uniformité
    }
    
    // On ajoute la nouvelle recette aux recettes personnalisées
    const recettesPersoMAJ = [...recettesPerso, recetteAvecId]
    
    // On sauvegarde les recettes personnalisées dans le localStorage
    localStorage.setItem('recettesPerso', JSON.stringify(recettesPersoMAJ))
    
    // On met à jour l'état avec toutes les recettes
    // Les recettes de base restent inchangées
    setRecettes(prevRecettes => {
      // On filtre les recettes de base (celles qui ne sont pas dans recettesPerso)
      const recettesDeBase = prevRecettes.filter(r => 
        !recettesPerso.some(rp => rp.id === r.id)
      )
      return [...recettesDeBase, ...recettesPersoMAJ]
    })
  }

  // Fonction pour supprimer une recette
  const supprimerRecette = (recetteId) => {
    // On ne peut supprimer que les recettes personnalisées
    const recettesPerso = JSON.parse(localStorage.getItem('recettesPerso') || '[]')
    
    // On filtre la recette à supprimer
    const recettesPersoMAJ = recettesPerso.filter(recette => recette.id !== recetteId)
    
    // Mise à jour du localStorage
    localStorage.setItem('recettesPerso', JSON.stringify(recettesPersoMAJ))
    
    // Mise à jour de l'état
    setRecettes(prevRecettes => {
      // On garde les recettes de base et on ajoute les recettes personnalisées mises à jour
      const recettesDeBase = prevRecettes.filter(r => 
        !recettesPerso.some(rp => rp.id === r.id)
      )
      return [...recettesDeBase, ...recettesPersoMAJ]
    })
  }

  // Fonction pour obtenir les recettes d'un utilisateur spécifique
  const getRecettesUtilisateur = (username) => {
    // On filtre toutes les recettes pour ne garder que celles de l'utilisateur
    return recettes.filter(recette => recette.author === username)
  }

  // Fonction pour obtenir une recette par son ID
  const getRecetteById = (id) => {
    // On cherche dans toutes les recettes (base + personnalisées)
    // On s'assure que la comparaison se fait avec des strings
    return recettes.find(recette => String(recette.id) === String(id))
  }

  return {
    recettes,              // Toutes les recettes (base + personnalisées)
    ajouterRecette,        // Fonction pour ajouter une recette
    supprimerRecette,      // Fonction pour supprimer une recette
    getRecettesUtilisateur, // Fonction pour obtenir les recettes d'un utilisateur
    getRecetteById         // Fonction pour obtenir une recette par son ID
  }
}

export default useRecettes
