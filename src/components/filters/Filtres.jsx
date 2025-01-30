import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaTimes, FaBars } from "react-icons/fa";

const Filtres = ({ onFiltrer }) => {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const [etatsDesFiltres, setEtatsDesFiltres] = useState({
    date: { actif: false, inverse: false },
    popularite: { actif: false, inverse: false },
    difficulte: { actif: false, inverse: false },
  });

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

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const gererClicFiltre = (nomFiltre) => {
    setEtatsDesFiltres((prev) => {
      const nouveauxEtats = {
        date: { actif: false, inverse: false },
        popularite: { actif: false, inverse: false },
        difficulte: { actif: false, inverse: false },
      };

      if (prev[nomFiltre].actif) {
        nouveauxEtats[nomFiltre] = {
          actif: true,
          inverse: !prev[nomFiltre].inverse,
        };
      } else {
        nouveauxEtats[nomFiltre] = { actif: true, inverse: false };
      }

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

  const obtenirClassesBouton = (nomFiltre) => {
    return `flex items-center gap-2 px-4 py-2 rounded-lg ${
      etatsDesFiltres[nomFiltre].actif
        ? "bg-[#A27B5C] text-[#DCD7C9]"
        : "bg-[#2C3639] text-[#DCD7C9] hover:bg-[#3F4E4F]"
    } transition-colors`;
  };

  const obtenirTexteBouton = (nomFiltre) => {
    return configurationFiltres[nomFiltre].texte;
  };

  // Composant du menu mobile
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
        {/* Ligne du titre */}
        <div className="w-full  shadow-[#a19a96] shadow-4xl">
          <h2 className="text-3xl pb-2 w-fit px-6 bg-[#A27B5C]/50 rounded-lg text-[#DCD7C9] flex justify-center font-memoirs underline-offset-4  mx-auto titleShadow">
            Choisissez un filtre
          </h2>
          ²
        </div>

        {/* Version Mobile */}
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

        {/* Version Desktop */}
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
