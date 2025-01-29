import React, { useState } from "react";
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

const Header = () => {
  // États et hooks
  const [menuOuvert, setMenuOuvert] = useState(false); // Menu de navigation
  const navigate = useNavigate(); // Hook pour la navigation

  // Vérifier si l'utilisateur est connecté
  const estConnecte = localStorage.getItem("isLoggedIn") === "true";
  const nomUtilisateur = localStorage.getItem("username");

  // Fonctions
  const toggleMenu = () => setMenuOuvert(!menuOuvert);

  const deconnexion = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="bg-white w-full">
      {/* Bannière de bienvenue */}
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
              </>
            ) : (
              <span>Bienvenue sur Let's Cook</span>
            )}
          </p>
        </article>
      </section>

      {/* Navigation principale */}
      <nav className="background-principale" aria-label="Navigation principale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Barre de navigation */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
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

            {/* Menu desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <HomeButton />
              {estConnecte && <DashboardButton />}
              {estConnecte ? (
                <button onClick={deconnexion} className="btn-site">
                  <FaSignOutAlt className="max-w-5 max-h-5" />
                  <span>Déconnexion</span>
                </button>
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login" className="btn-site">
                    <FaUser className="max-w-5 max-h-5" />
                    <span>Connexion</span>
                  </Link>
                  <Link to="/signup" className="btn-site">
                    <FaUserPlus className="max-w-5 max-h-5" />
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
              <button onClick={deconnexion} className="btn-site w-full">
                <FaSignOutAlt className="max-w-5 max-h-5" />
                <span>Déconnexion</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-site w-full">
                  <FaUser className="max-w-5 max-h-5" />
                  <span>Connexion</span>
                </Link>
                <Link to="/signup" className="btn-site w-full">
                  <FaUserPlus className="max-w-5 max-h-5" />
                  <span>Inscription</span>
                </Link>
              </>
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
                rgba(0,0,0,0) 0%,
                rgba(44,54,57,0.1) 85%,
                rgba(44,54,57,0.95) 100%
              ),
              url("/images/header2.png")
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <article className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-memoirs text-[#DCD7C9] mb-4 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">
              Bienvenue sur Let's Cook
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-content mb-8 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)]">
              Découvrez nos meilleures recettes de cuisine
            </p>
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </article>
        </section>
      </nav>
    </header>
  );
};

export default Header;
