import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState(""); // State pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // State pour le mot de passe
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogin = (e) => {
    e.preventDefault();
    // Version simplifiée de la connexion
    if (username && password) {
      localStorage.setItem("isLoggedIn", "true"); // Stocke l'état de connexion
      localStorage.setItem("username", username); // Stocke le nom d'utilisateur
      navigate("/dashboard"); // Redirige vers la page de dashboard
    } else {
      alert("Veuillez remplir tous les champs"); // Affiche un message d'erreur
    }
  };

  return (
    // Formulaire de connexion
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="relative w-full max-w-[400px] bg-[#2C3639]/95 p-6 rounded-lg">
        {/* Bouton de fermeture */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-[#DCD7C9] hover:text-[#A27B5C] p-2"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label className="text-[#DCD7C9]">
              <div className="flex items-center gap-2 mb-1">
                <FaUser className="w-4 h-4" />
                <span>Nom d'utilisateur</span>
              </div>
              <input
                placeholder="Entrez votre nom d'utilisateur"
                type="text"
                className="w-full p-2 bg-[#1B2223] text-[#DCD7C9] rounded border border-[#DCD7C9]/20 focus:border-[#A27B5C] focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-[#DCD7C9]">
              <div className="flex items-center gap-2 mb-1">
                <FaLock className="w-4 h-4" />
                <span>Mot de passe</span>
              </div>
              <input
                placeholder="Entrez votre mot de passe"
                type="password"
                className="w-full p-2 bg-[#1B2223] text-[#DCD7C9] rounded border border-[#DCD7C9]/20 focus:border-[#A27B5C] focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#A27B5C] text-[#DCD7C9] rounded hover:bg-[#A27B5C]/80 transition-colors"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
