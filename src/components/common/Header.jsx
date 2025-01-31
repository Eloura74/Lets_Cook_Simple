// Header.js

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import HomeButton from "../buttons/HomeButton";
import DashboardButton from "../buttons/Dashboard";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import CircleType from "circletype";

const Header = () => {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [afficherImage, setAfficherImage] = useState(false);
  const navigate = useNavigate();
  const estConnecte = localStorage.getItem("isLoggedIn") === "true";
  const nomUtilisateur = localStorage.getItem("username");

  // --------- Pour CircleType ---------
  const texteHeroRef = useRef(null);
  const circleTypeRef = useRef(null);

  useEffect(() => {
    if (texteHeroRef.current && !circleTypeRef.current) {
      circleTypeRef.current = new CircleType(texteHeroRef.current);
      circleTypeRef.current.radius(2500);
    }

    // Cleanup pour éviter les problèmes de mémoire
    return () => {
      if (circleTypeRef.current) {
        circleTypeRef.current.destroy();
        circleTypeRef.current = null;
      }
    };
  }, []); // Dépendances vides pour n'exécuter qu'une seule fois
  // -----------------------------------

  const toggleMenu = () => setMenuOuvert(!menuOuvert);

  const deconnexion = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-white w-full">
      {/* Easter Egg Nathan */}
      {/* {afficherImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={() => setAfficherImage(false)}
        >
          <div className="relative">
            <img 
              src="/images/nathan.webp" 
              alt="Nathan"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setAfficherImage(false)}
              className="absolute -top-4 -right-4 bg-[#A27B5C] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#A27B5C]/80"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )} */}
      {/* Style pour l'animation du text-shadow */}
      <style>
        {`
          @keyframes glowText {
            0% {
              text-shadow: 0 0 5px rgba(156,120,91,0.8),
                         0 0 10px rgba(156,120,91,0.5);
            }
            50% {
              text-shadow: 0 0 20px rgba(156,120,91,1),
                         0 0 30px rgba(156,120,91,0.8),
                         0 0 40px rgba(156,120,91,0.6);
            }
            100% {
              text-shadow: 0 0 5px rgba(156,120,91,0.8),
                         0 0 10px rgba(156,120,91,0.5);
            }
          }
          .animate-glow {
            animation: glowText 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Bannière promotionnelle */}
      <section className="bg-gradient-to-r from-[#2C3639] via-[#2C3639] to-[#2C3639] shadow-lg">
        <article className="container mx-auto">
          <p className="py-2 px-4 md:px-6 font-memoirs text-sm sm:text-base md:text-lg flex flex-wrap items-center justify-center gap-2 text-[#DCD7C9]">
            {estConnecte ? (
              <>
                <span>Bienvenue</span>
                <strong className="text-lg sm:text-xl md:text-2xl font-bold text-[#A27B5C] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
                  {nomUtilisateur}
                  {" ! "}
                </strong>
                <span className="hidden sm:inline mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer text-center">
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    Abonnez vous à notre newsletter et recevez notre livre de
                    recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span
                  className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
                  onClick={() => setAfficherImage(!afficherImage)}
                >
                  GRATUIT !
                </span>
              </>
            ) : (
              <>
                <span>Bienvenue sur Let's Cook</span>
                <span className="hidden sm:inline mx-2" aria-hidden="true">
                  •
                </span>
                <span className="relative group cursor-pointer text-center">
                  <span className="whitespace-normal sm:whitespace-nowrap">
                    Abonnez vous à notre newsletter et recevez notre livre de
                    recettes
                    <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#A27B5C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </span>
                <span
                  className="badge-gratuit ml-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-2 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer"
                  onClick={() => alert("Nathan , rien n'est gratuit !")}
                >
                  GRATUIT !
                </span>
              </>
            )}
          </p>
        </article>
      </section>
      {/* ______________________________________________________________________ */}
      {/* Navigation principale */}
      <nav className="background-principale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          {/* Logo et navigation */}
          <div className="flex justify-between items-center ">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 nav-link">
              <img
                src="/images/2-1logo.png"
                alt="Logo Let's Cook"
                className="h-12 sm:h-16 md:h-20 w-auto object-contain mix-blend-screen brightness-200"
              />
            </Link>

            {/* Bouton menu mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white"
              aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {menuOuvert ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <HomeButton />
              {estConnecte && <DashboardButton />}
              {estConnecte ? (
                <button
                  onClick={deconnexion}
                  className="btn-site flex items-center gap-2"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="nav-link flex items-center gap-2 text-white hover:text-[#DCD7C9] transition-colors duration-200"
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Connexion</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-link flex items-center gap-2 text-white hover:text-[#DCD7C9] transition-colors duration-200"
                  >
                    <FaUserPlus className="w-5 h-5" />
                    <span>Inscription</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Menu mobile */}
          <div
            className={`md:hidden transition-all duration-300 ${
              menuOuvert ? "block" : "hidden"
            } mt-4 space-y-2`}
          >
            <HomeButton />
            {estConnecte && <DashboardButton />}
            {estConnecte ? (
              <button
                onClick={deconnexion}
                className="btn-site flex items-center gap-2 w-full"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Déconnexion</span>
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="nav-link flex items-center gap-2 w-full text-white hover:text-[#DCD7C9] transition-colors duration-200"
                >
                  <FaUser className="w-5 h-5" />
                  <span>Connexion</span>
                </Link>
                <Link
                  to="/signup"
                  className="nav-link flex items-center gap-2 w-full text-white hover:text-[#DCD7C9] transition-colors duration-200"
                >
                  <FaUserPlus className="w-5 h-5" />
                  <span>Inscription</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Section Hero avec barre de recherche */}
        <section
          className="relative min-h-[40vh] flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(0,0,0,0) 50%,
        rgba(44,54,57,0.6) 85%,
        rgba(44,54,57,1) 100%
      ),
      linear-gradient(
        to left,
        rgba(255,255,255,0.5) 0%,
        rgba(255,255,255,0.00) 40%, 
        rgba(46, 57, 59,0.99) 100%
      ),
      url("/images/header2.webp")
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Fond sombre */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

          {/* Effet de transition entre le header et la section suivante */}

          {/* Contenu par-dessus */}
          <div className="relative z-10 container mx-auto px-4">
            {/* Version mobile du titre */}
            <h1 className="md:hidden text-3xl font-bold text-white mb-8 animate-glow text-center">
              Découvrez nos meilleures recettes
            </h1>

            {/* Version desktop avec effet circulaire */}
            <h1
              ref={texteHeroRef}
              className="hidden md:block text-6xl font-bold text-white mb-8 tracking-[.25em] animate-glow"
            >
              Découvrez nos meilleures recettes
            </h1>

            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </section>
      </nav>
    </header>
  );
};

export default Header;
