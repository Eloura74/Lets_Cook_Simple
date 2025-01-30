import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHome, FaChartBar } from 'react-icons/fa'

// Ouvrir un lien au clic sur le mail
const openMail = 'contact@letscook.fr'

const Footer = () => {
  const navigate = useNavigate();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    const estConnecte = localStorage.getItem("isLoggedIn") === "true";
    if (estConnecte) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <footer className="card-container text-white py-8 mt-6 shadow-[#4A403A] shadow-4xl">
      <section className="container mx-auto px-4">
        <article className="pl-6 pr-6">
          <div className="flex flex-col justify-center items-center mx-auto">
            <h3 className="text-xl font-bold mb-4">Let's Cook</h3>
            <p>Découvrez les meilleures recettes de cuisine</p>
          </div>
          <nav className="mt-6">
            <ul className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <li>
                <Link
                  to="/#filtres-recettes"
                  className="btn-site flex items-center gap-2 whitespace-nowrap"
                >
                  <FaHome className="max-w-5 max-h-5" />
                  <span className="text-lg sm:text-xl">Accueil</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleDashboardClick}
                  className="btn-site flex items-center gap-2 whitespace-nowrap"
                >
                  <FaChartBar className="max-w-5 max-h-5" />
                  <span className="text-lg sm:text-xl">Tableau de bord</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex flex-col justify-center items-center mt-6">
            <a
              href={`mailto:${openMail}`}
              className="btn-site text-lg"
              aria-label="Envoyer un email"
            >
              {openMail}
            </a>
          </div>
        </article>
        <div className="mt-8 pt-8 border-t border-[#A27B5C] text-center">
          <p>
            &copy; {new Date().getFullYear()} Let's Cook. Tous droits réservés.
          </p>
        </div>
      </section>
    </footer>
  )
}

export default Footer
