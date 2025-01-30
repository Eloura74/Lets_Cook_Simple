import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaTimes, FaBars } from "react-icons/fa";

/**
 * Composant Filtres - Système de filtrage des recettes
 * Permet de trier les recettes selon différents critères (date, popularité, difficulté)
 * Inclut une version responsive pour mobile et desktop
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onFiltrer - Fonction de callback appelée lors de l'application d'un filtre
 */
const Filtres = ({ onFiltrer }) => {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);

  /**
   * État pour gérer les filtres actifs et leur direction (ascendant/descendant)
   * Chaque filtre a deux propriétés :
   * - actif : indique si le filtre est actuellement appliqué
   * - inverse : indique la direction du tri (true = ascendant, false = descendant)
   */
  const [etatsDesFiltres, setEtatsDesFiltres] = useState({
    date: { actif: false, inverse: false },
    popularite: { actif: false, inverse: false },
    difficulte: { actif: false, inverse: false },
  });

  /**
   * Configuration des différents filtres disponibles
   * Chaque filtre définit :
   * - texte : Le libellé affiché dans l'interface
   * - comparateur : La fonction de comparaison pour le tri
   */
  const configurationFiltres = {
    date: {
      texte: "Date",
      comparateur: (a, b, inverse) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return inverse ? dateA - dateB : dateB - dateA;
      },
    },
    popularite: {
      texte: "Popularité",
      comparateur: (a, b, inverse) => {
        return inverse ? a.likes - b.likes : b.likes - a.likes;
      },
    },
    difficulte: {
      texte: "Difficulté",
      comparateur: (a, b, inverse) => {
        return inverse
          ? a.difficulty - b.difficulty
          : b.difficulty - a.difficulty;
      },
    },
  };

  /**
   * Animations pour le menu mobile utilisant Framer Motion
   */
  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  /**
   * Gère le clic sur un bouton de filtre
   * - Désactive tous les autres filtres
   * - Active le filtre cliqué ou inverse sa direction si déjà actif
   * - Applique le tri sur les recettes
   * 
   * @param {string} nomFiltre - Le nom du filtre à appliquer
   */
  const gererClicFiltre = (nomFiltre) => {
    setEtatsDesFiltres((prev) => {
      // Réinitialise tous les filtres
      const nouveauxEtats = {
        date: { actif: false, inverse: false },
        popularite: { actif: false, inverse: false },
        difficulte: { actif: false, inverse: false },
      };

      // Gère l'état du filtre cliqué
      if (prev[nomFiltre].actif) {
        nouveauxEtats[nomFiltre] = {
          actif: true,
          inverse: !prev[nomFiltre].inverse,
        };
      } else {
        nouveauxEtats[nomFiltre] = { actif: true, inverse: false };
      }

      // Applique le tri sur les recettes
      onFiltrer((recettes) => {
        const recettesTriees = [...recettes].sort((a, b) =>
          configurationFiltres[nomFiltre].comparateur(
            a,
            b,
            nouveauxEtats[nomFiltre].inverse
          )
        );
        return recettesTriees;
      });

      return nouveauxEtats;
    });
  };

  /**
   * Détermine les classes CSS pour un bouton de filtre
   * @param {string} nomFiltre - Le nom du filtre
   * @returns {string} Les classes CSS à appliquer
   */
  const obtenirClassesBouton = (nomFiltre) => {
    return `flex items-center gap-2 px-4 py-2 rounded-lg ${
      etatsDesFiltres[nomFiltre].actif
        ? "bg-[#A27B5C] text-[#DCD7C9]"
        : "bg-[#2C3639] text-[#DCD7C9] hover:bg-[#3F4E4F]"
    } transition-colors`;
  };

  /**
   * Récupère le texte à afficher pour un filtre
   * @param {string} nomFiltre - Le nom du filtre
   * @returns {string} Le texte à afficher
   */
  const obtenirTexteBouton = (nomFiltre) => {
    return configurationFiltres[nomFiltre].texte;
  };

  /**
   * Composant interne pour le menu mobile
   * Utilise createPortal pour rendre le menu en dehors de la hiérarchie DOM normale
   */
  const MenuMobile = () => {
    if (!menuMobileOuvert) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black/50 z-[99999] lg:hidden">
        <motion.div
          className="fixed top-[4rem] inset-x-8 flex flex-col gap-4 bg-[#2C3639]/35 p-2 rounded-lg shadow-xl shadow-[#4A403A]/90"
          initial="closed"
          animate="open"
          variants={menuVariants}
        >
          <div className="flex flex-col gap-4 shadow-xl shadow-[#4A403A]/90">
            {/* Boutons de filtres pour mobile */}
            {Object.keys(configurationFiltres).map((nomFiltre) => (
              <button
                key={nomFiltre}
                onClick={() => {
                  gererClicFiltre(nomFiltre);
                  setMenuMobileOuvert(false);
                }}
                className={obtenirClassesBouton(nomFiltre)}
              >
                <span className="font-medium">
                  {obtenirTexteBouton(nomFiltre)}
                </span>
                {etatsDesFiltres[nomFiltre].actif && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center w-5 h-5 rounded-full bg-[#A27B5C] text-white text-xs"
                  >
                    {etatsDesFiltres[nomFiltre].inverse ? "↑" : "↓"}
                  </motion.span>
                )}
              </button>
            ))}
            {/* Bouton pour réinitialiser les filtres */}
            {Object.values(etatsDesFiltres).some((filtre) => filtre.actif) && (
              <button
                onClick={() => {
                  setEtatsDesFiltres({
                    date: { actif: false, inverse: false },
                    popularite: { actif: false, inverse: false },
                    difficulte: { actif: false, inverse: false },
                  });
                  onFiltrer((recettes) => [...recettes]);
                  setMenuMobileOuvert(false);
                }}
                className="btn-site px-4 py-2"
              >
                Tout afficher
              </button>
            )}
          </div>

          {/* Bouton de fermeture du menu mobile */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setMenuMobileOuvert(false)}
              className="rounded-full p-2 bg-[#A27B5C] hover:bg-[#A27B5C]/80 transition-colors"
              aria-label="Fermer le menu des filtres"
            >
              <FaTimes className="w-6 h-6 text-[#DCD7C9]" />
            </button>
          </div>
        </motion.div>
      </div>,
      document.body
    );
  };

  return (
    <section className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-center">
      <div className="flex flex-wrap items-center gap-6 w-full">
        {/* En-tête avec titre */}
        <div className="w-full shadow-[#a19a96] shadow-4xl">
          <h2 className="text-3xl pb-2 w-fit px-6 bg-[#A27B5C]/50 rounded-lg text-[#DCD7C9] flex justify-center font-memoirs underline-offset-4 mx-auto titleShadow">
            Choisissez un filtre
          </h2>
        </div>

        {/* Interface mobile avec bouton toggle */}
        <div className="lg:hidden w-full">
          <button
            className="btn-site flex items-center mx-auto gap-2 mb-1"
            onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            aria-label={
              menuMobileOuvert ? "Fermer les filtres" : "Ouvrir les filtres"
            }
          >
            {menuMobileOuvert ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
            <span>Filtres</span>
          </button>

          <MenuMobile />
        </div>

        {/* Interface desktop avec tous les filtres visibles */}
        <div className="hidden lg:flex flex-wrap justify-center items-center gap-3 w-full">
          {Object.keys(configurationFiltres).map((nomFiltre) => (
            <motion.button
              key={nomFiltre}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => gererClicFiltre(nomFiltre)}
              className={obtenirClassesBouton(nomFiltre)}
            >
              <span className="font-medium">
                {obtenirTexteBouton(nomFiltre)}
              </span>
              {etatsDesFiltres[nomFiltre].actif && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-[#A27B5C] text-white text-xs"
                >
                  {etatsDesFiltres[nomFiltre].inverse ? "↑" : "↓"}
                </motion.span>
              )}
            </motion.button>
          ))}

          {/* Bouton de réinitialisation des filtres */}
          {Object.values(etatsDesFiltres).some((filtre) => filtre.actif) && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setEtatsDesFiltres({
                  date: { actif: false, inverse: false },
                  popularite: { actif: false, inverse: false },
                  difficulte: { actif: false, inverse: false },
                });
                onFiltrer((recettes) => [...recettes]);
              }}
              className="btn-site px-4 py-2"
            >
              Tout afficher
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Filtres;
