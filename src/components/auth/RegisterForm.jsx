import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaTimes, FaEnvelope } from "react-icons/fa";

/**
 * Composant RegisterForm - Formulaire d'inscription utilisateur
 * Permet à un nouvel utilisateur de créer un compte avec un nom d'utilisateur,
 * une adresse email et un mot de passe
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Function} props.onClose - Fonction appelée pour fermer le formulaire
 */
const RegisterForm = ({ onClose }) => {
  // États pour gérer les champs du formulaire
  const [username, setUsername] = useState(""); // Nom d'utilisateur
  const [email, setEmail] = useState("");      // Adresse email
  const [password, setPassword] = useState(""); // Mot de passe

  // Hook de navigation pour la redirection après inscription
  const navigate = useNavigate();

  /**
   * Gère la soumission du formulaire d'inscription
   * Vérifie que tous les champs sont remplis, enregistre les informations
   * dans le localStorage et redirige vers le tableau de bord
   * 
   * @param {Event} e - L'événement de soumission du formulaire
   */
  const handleRegister = (e) => {
    e.preventDefault();
    // Vérifie que tous les champs sont remplis
    if (username && email && password) {
      // Stockage des informations de connexion
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      // Redirection vers le tableau de bord
      navigate("/dashboard");
    } else {
      alert("Veuillez remplir tous les champs");
    }
  };

  return (
    // Conteneur principal avec fond semi-transparent
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      {/* Carte du formulaire */}
      <div className="relative w-full max-w-[400px] bg-[#2C3639]/95 p-6 rounded-lg">
        {/* Bouton de fermeture du formulaire */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-[#DCD7C9] hover:text-[#A27B5C] p-2"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleRegister} className="flex flex-col space-y-4 mt-4">
          {/* Champ nom d'utilisateur */}
          <div className="flex flex-col space-y-2">
            <label className="text-[#DCD7C9]">
              <div className="flex items-center gap-2 mb-1">
                <FaUser className="w-4 h-4" />
                <span>Nom d'utilisateur</span>
              </div>
              <input
                placeholder="Choisissez un nom d'utilisateur"
                type="text"
                className="w-full p-2 bg-[#1B2223] text-[#DCD7C9] rounded border border-[#DCD7C9]/20 focus:border-[#A27B5C] focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Champ email */}
          <div className="flex flex-col space-y-2">
            <label className="text-[#DCD7C9]">
              <div className="flex items-center gap-2 mb-1">
                <FaEnvelope className="w-4 h-4" />
                <span>Email</span>
              </div>
              <input
                placeholder="Entrez votre email"
                type="email"
                className="w-full p-2 bg-[#1B2223] text-[#DCD7C9] rounded border border-[#DCD7C9]/20 focus:border-[#A27B5C] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Champ mot de passe */}
          <div className="flex flex-col space-y-2">
            <label className="text-[#DCD7C9]">
              <div className="flex items-center gap-2 mb-1">
                <FaLock className="w-4 h-4" />
                <span>Mot de passe</span>
              </div>
              <input
                placeholder="Choisissez un mot de passe"
                type="password"
                className="w-full p-2 bg-[#1B2223] text-[#DCD7C9] rounded border border-[#DCD7C9]/20 focus:border-[#A27B5C] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full p-2 bg-[#A27B5C] text-[#DCD7C9] rounded hover:bg-[#A27B5C]/80 transition-colors"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
