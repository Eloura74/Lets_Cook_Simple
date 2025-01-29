import React, { useState } from 'react';
import { FaSort, FaHeart, FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Filtres = ({ onFiltrer }) => {
  const [filtreActif, setFiltreActif] = useState(null);
  const [ordreInverse, setOrdreInverse] = useState(false);

  // Fonction pour gérer le clic sur un filtre
  const gererClicFiltre = (type) => {
    if (filtreActif === type) {
      // Si on clique sur le même filtre, on inverse l'ordre
      setOrdreInverse(!ordreInverse);
      appliquerFiltre(type, !ordreInverse);
    } else {
      // Si on clique sur un nouveau filtre
      setFiltreActif(type);
      setOrdreInverse(false);
      appliquerFiltre(type, false);
    }
  };

  // Fonction pour appliquer le filtre
  const appliquerFiltre = (type, inverse) => {
    switch (type) {
      case 'date':
        onFiltrer((recettes) => 
          [...recettes].sort((a, b) => {
            const comparaison = new Date(b.date) - new Date(a.date);
            return inverse ? -comparaison : comparaison;
          })
        );
        break;
      case 'popularite':
        onFiltrer((recettes) => 
          [...recettes].sort((a, b) => {
            const comparaison = b.likes - a.likes;
            return inverse ? -comparaison : comparaison;
          })
        );
        break;
      case 'difficulte':
        onFiltrer((recettes) => 
          [...recettes].sort((a, b) => {
            const comparaison = b.difficulty - a.difficulty;
            return inverse ? -comparaison : comparaison;
          })
        );
        break;
      default:
        onFiltrer((recettes) => [...recettes]);
    }
  };

  // Réinitialiser les filtres
  const reinitialiserFiltres = () => {
    setFiltreActif(null);
    setOrdreInverse(false);
    onFiltrer((recettes) => [...recettes]);
  };

  // Fonction pour obtenir le texte du bouton
  const obtenirTexteBouton = (type) => {
    if (filtreActif !== type) return `Par ${type}`;
    return ordreInverse ? `${type} (croissant)` : `${type} (décroissant)`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl text-center text-[#DCD7C9] mb-4 font-memoirs">
        Filtrer les recettes
      </h2>
      
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => gererClicFiltre('date')}
          className={`btn-site flex items-center gap-2 ${
            filtreActif === 'date' ? 'bg-[#A27B5C] text-white' : ''
          }`}
        >
          {filtreActif === 'date' ? (
            ordreInverse ? <FaArrowUp /> : <FaArrowDown />
          ) : (
            <FaSort />
          )}
          <span>{obtenirTexteBouton('date')}</span>
        </button>

        <button
          onClick={() => gererClicFiltre('popularite')}
          className={`btn-site flex items-center gap-2 ${
            filtreActif === 'popularite' ? 'bg-[#A27B5C] text-white' : ''
          }`}
        >
          {filtreActif === 'popularite' ? (
            ordreInverse ? <FaArrowUp /> : <FaArrowDown />
          ) : (
            <FaHeart />
          )}
          <span>{obtenirTexteBouton('popularite')}</span>
        </button>

        <button
          onClick={() => gererClicFiltre('difficulte')}
          className={`btn-site flex items-center gap-2 ${
            filtreActif === 'difficulte' ? 'bg-[#A27B5C] text-white' : ''
          }`}
        >
          {filtreActif === 'difficulte' ? (
            ordreInverse ? <FaArrowUp /> : <FaArrowDown />
          ) : (
            <FaStar />
          )}
          <span>{obtenirTexteBouton('difficulte')}</span>
        </button>

        {filtreActif && (
          <button
            onClick={reinitialiserFiltres}
            className="btn-site"
          >
            Tout afficher
          </button>
        )}
      </div>
    </div>
  );
};

export default Filtres;
