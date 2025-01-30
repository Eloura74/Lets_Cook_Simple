# Let's Cook Simple 🍳

Application web de recettes de cuisine moderne et intuitive, construite avec React et Tailwind CSS.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Composants principaux](#-composants-principaux)
- [Styles et thème](#-styles-et-thème)
- [Exemples d'utilisation](#-exemples-dutilisation)
- [Contribution](#-contribution)

## ✨ Fonctionnalités

- 🔍 **Recherche avancée** de recettes avec filtres
- 👤 **Système d'authentification** complet
- 📱 **Design responsive** adapté à tous les écrans
- 💾 **Sauvegarde locale** des recettes favorites
- 📨 **Newsletter** avec livre de recettes gratuit
- 📊 **Dashboard** personnalisé pour chaque utilisateur

## 🛠 Technologies utilisées

- **React 18** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utilitaire
- **CircleType** - Animation de texte courbe
- **React Icons** - Icônes SVG
- **LocalStorage** - Stockage local des données

## 🚀 Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/lets-cook-simple.git

# Installer les dépendances
cd lets-cook-simple
npm install

# Lancer le serveur de développement
npm run dev
```

## 📁 Structure du projet

```
lets-cook-simple/
├── src/
│   ├── components/
│   │   ├── buttons/
│   │   ├── common/
│   │   ├── filters/
│   │   └── ui/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   └── App.jsx
├── public/
└── package.json
```

## 🧩 Composants principaux

### Header.jsx
```jsx
// Exemple d'utilisation du header avec bannière promotionnelle
<Header>
  <BannierePromo>
    Abonnez-vous à notre newsletter et recevez notre livre de recettes
    <Badge>GRATUIT !</Badge>
  </BannierePromo>
</Header>
```

### SearchBar.jsx
```jsx
// Exemple de barre de recherche avec auto-complétion
const SearchBar = () => {
  const { recettes, recherche, setRecherche } = useRecettes();
  
  return (
    <div className="search-container">
      <input 
        type="text"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        placeholder="Rechercher une recette..."
      />
    </div>
  );
};
```

## 🎨 Styles et thème

### Palette de couleurs
```css
:root {
  --primary: #2C3639;
  --secondary: #A27B5C;
  --accent: #DCD7C9;
  --background: #3F4E4F;
}
```

### Classes utilitaires personnalisées
```css
.btn-site {
  @apply px-4 py-2 bg-[#A27B5C] text-white rounded-lg
         hover:bg-[#8B6B4F] transition-colors duration-200;
}

.nav-link {
  @apply flex items-center gap-2 text-white
         hover:text-[#DCD7C9] transition-colors duration-200;
}
```

## 💡 Exemples d'utilisation

### Authentification
```javascript
// Connexion utilisateur
const connexion = () => {
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("username", nomUtilisateur);
  navigate("/dashboard");
};
```

### Gestion des recettes
```javascript
// Hook personnalisé pour les recettes
const useRecettes = () => {
  const [recettes, setRecettes] = useState([]);
  
  const ajouterRecette = (nouvelleRecette) => {
    setRecettes([...recettes, nouvelleRecette]);
    // Sauvegarde dans le localStorage
    localStorage.setItem("recettes", JSON.stringify([...recettes, nouvelleRecette]));
  };
  
  return { recettes, ajouterRecette };
};
```

### Animations
```css
/* Animation du text-shadow */
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
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Tailwind CSS](https://tailwindcss.com) pour le framework CSS
- [React Icons](https://react-icons.github.io/react-icons) pour les icônes
- [CircleType](https://circletype.labwire.ca) pour les animations de texte
