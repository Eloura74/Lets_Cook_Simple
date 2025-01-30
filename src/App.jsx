import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/common/Header";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import HomePage from "./pages/HomePage";
import RecipeDetail from "./pages/RecipeDetail";
import DashboardPage from "./pages/DashboardPage";

// Fonction simple pour vérifier si l'utilisateur est connecté
const estConnecte = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

// Route protégée simplifiée
const RoutePrivee = ({ children }) => {
  if (!estConnecte()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col background-principale">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6 ">
          <Routes>
            {/* accueil */}
            <Route path="/" element={<HomePage />} />
            {/* connexion */}
            <Route path="/login" element={<LoginForm />} />
            {/* inscription */}
            <Route path="/signup" element={<RegisterForm />} />
            {/* dashboard */}
            <Route
              path="/dashboard"
              element={
                <RoutePrivee>
                  <DashboardPage />
                </RoutePrivee>
              }
            />
            <Route path="/recette/:id" element={<RecipeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
