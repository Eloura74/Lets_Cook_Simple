import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const RegisterForm = () => {
  const [username, setUsername] = useState(""); // State pour le nom d'utilisateur
  const [password, setPassword] = useState(""); // State pour le mot de passe
  const navigate = useNavigate(); // Hook pour la navigation

  const handleRegister = (e) => {
    // Fonction pour l'inscription
    e.preventDefault(); // Empeche le rechargement de la page
    // Version simplifiée de l'inscription
    if (username && password) {
      // Vérifie que les champs sont remplis
      localStorage.setItem("isLoggedIn", "true"); // Stocke l'état de connexion
      localStorage.setItem("username", username); // Stocke le nom d'utilisateur
      navigate("/dashboard"); // Redirige vers la page de dashboard
    } else {
      alert("Veuillez remplir tous les champs"); // Affiche un message d'erreur
    }
  };

  return (
    <main className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex justify-center items-center bg-[#2C3639]/95 p-4 z-50">
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <div className="flex items-center border-b border-[#2C3639]">
          <label className="w-full p-2 bg-red-500">
            <div className="flex items-center">
              <FaUser />
              <p className="ml-2">Choisissez un nom d'utilisateur</p>
            </div>
            <input
              placeholder="Nom d'utilisateur"
              type="text"
              className="w-full p-2 bg-black mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex items-center border-b border-[#2C3639]">
          <label className="w-full p-2 bg-red-500">
            <div className="flex items-center">
              <FaLock />
              <p className="ml-2">Choisissez un mot de passe</p>
            </div>
            <input
              placeholder="Mot de passe"
              type="password"
              className="w-full p-2 bg-black mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-[#3F4E4F] text-white hover:bg-[#2C3639] transition-colors"
        >
          S'inscrire
        </button>
      </form>
    </main>
  );
};

export default RegisterForm;
