![Image d'accueil](../Lets_Cook_Simple/public/ImgReadme/Accueil.png)

# Let's Cook 

Une application web de recettes de cuisine moderne et intuitive, créée avec React et Tailwind CSS. Idéale pour les passionnés de cuisine qui souhaitent partager leurs recettes !

##  Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalites)
- [Installation et démarrage](#installation-et-demarrage)
- [Guide des composants](#guide-des-composants)
- [Gestion des données](#gestion-des-donnees)
- [Style et mise en page](#style-et-mise-en-page)
- [Comment contribuer](#comment-contribuer)

##  Vue d'ensemble

Let's Cook est une application qui permet de :

- Découvrir des recettes de cuisine
- Rechercher facilement des recettes par nom ou catégorie
- Sauvegarder vos recettes préférées ( à venir )
- Créer des recettes via un tableau de bord

##  Fonctionnalités

###  Système de recherche intelligent

![Search](../Lets_Cook_Simple/public/ImgReadme/Search.png)

- Recherche instantanée pendant la saisie
- Suggestions automatiques des recettes
- Filtres pratiques (par date, popularité, difficulté)
- Normalisation des accents pour une recherche plus précise

###  Espace personnel

![Dashboard](../Lets_Cook_Simple/public/ImgReadme/Dashboard.png)

- Inscription et Connexion rapide et simple
- Connexion sécurisée ( à venir )
- Gestion de vos recettes

###  Design adaptatif

- Interface qui s'adapte à tous les écrans
- Menu spécial pour mobile
- Navigation simple et intuitive

##  Installation et démarrage

### Ce dont vous avez besoin

- Node.js
- npm (gestionnaire de paquets)
- Un éditeur de code

### Étapes d'installation

1. Téléchargez le projet :

```bash
git clone https://github.com/votre-nom/lets-cook-simple.git
```

2. Installez les dépendances :

```bash
cd lets-cook-simple
npm install
```

3. Démarrez l'application :

```bash
npm run dev
```

##  Guide des composants

###  La barre de recherche (SearchBar)

Un composant essentiel qui permet de trouver rapidement des recettes.

#### Comment fonctionne la recherche ?

```javascript
// États pour gérer la recherche
const [texteRecherche, setTexteRecherche] = useState(""); // Le texte saisi
const [resultatsVisibles, setResultatsVisibles] = useState(false); // Affichage des résultats

// Fonction pour normaliser le texte (enlever les accents, mettre en minuscule)
const normaliserTexte = (texte) => {
  if (!texte) return "";
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Filtrage des recettes en temps réel
const recettesTrouvees = recettes
  .filter((recette) => {
    if (!texteRecherche.trim()) return false;
    return normaliserTexte(recette.titre).includes(
      normaliserTexte(texteRecherche)
    );
  })
  .slice(0, 5); // Limite à 5 résultats
```

###  Les filtres de tri (Filtres)

Permet de trier les recettes selon différents critères.

#### Comment fonctionnent les filtres ?

```javascript
// Configuration des différents filtres
const optionsFiltres = {
  date: {
    texte: "Date",
    trieur: (a, b, inverse) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return inverse ? dateA - dateB : dateB - dateA;
    },
  },
  popularite: {
    texte: "Popularité",
    trieur: (a, b, inverse) => {
      return inverse ? a.likes - b.likes : b.likes - a.likes;
    },
  },
};

// Gestion de l'état des filtres
const [filtresActifs, setFiltresActifs] = useState({
  date: { actif: false, inverse: false },
  popularite: { actif: false, inverse: false },
});
```

###  Le tableau de bord (Dashboard)

C'est votre espace personnel pour voir vos recettes.

#### Fonctionnalités principales :

- Création de nouvelles recettes
- Suppression de vos recettes existantes

```javascript
// Exemple de création d'une recette
const creerRecette = (e) => {
  e.preventDefault();

  // Création d'un identifiant unique
  const nouvelId = Date.now().toString();

  // Formatage de la recette
  const nouvelleRecette = {
    id: nouvelId,
    titre: titreRecette,
    description: descriptionRecette,
    difficulte: niveauDifficulte,
    tempsPreparation: tempsPrep,
    ingredients: listeIngredients,
    etapes: etapesPreparation,
    auteur: nomUtilisateur,
    dateCreation: new Date().toISOString(),
  };

  // Sauvegarde de la recette
  ajouterRecette(nouvelleRecette);
};
```

##  Gestion des données

### Stockage local (LocalStorage)

L'application utilise le stockage local du navigateur pour :

- Garder vos informations de connexion
- Sauvegarder vos recettes

Exemples d'utilisation :

```javascript
// Sauvegarde des informations de connexion
localStorage.setItem("utilisateurConnecte", "true");
localStorage.setItem("nomUtilisateur", nom);

// Récupération des informations
const estConnecte = localStorage.getItem("utilisateurConnecte") === "true";
const nomUtilisateur = localStorage.getItem("nomUtilisateur");

// Sauvegarde d'une recette
const sauvegarderRecette = (recette) => {
  const recettesExistantes = JSON.parse(
    localStorage.getItem("mesRecettes") || "[]"
  );
  localStorage.setItem(
    "mesRecettes",
    JSON.stringify([...recettesExistantes, recette])
  );
};
```

##  Style et mise en page

### Thème de couleurs

Notre application utilise des couleurs chaleureuses et accueillantes :

- Fond principal : #2C3639 (gris foncé chaleureux)
- Accent : #A27B5C (marron chaleureux)
- Texte : #DCD7C9 (beige clair)

### Classes Tailwind personnalisées

```css
/* Bouton standard de l'application */
.bouton-principal {
  @apply flex items-center gap-2 px-4 py-2 
         bg-[#A27B5C] text-[#DCD7C9] 
         rounded-lg hover:bg-[#A27B5C]/80 
         transition-colors;
}

/* Carte de recette */
.carte-recette {
  @apply bg-[#2C3639]/90 
         rounded-lg p-4
         border border-[#DCD7C9]/10
         hover:shadow-lg
         transition-all duration-300;
}
```

##  Organisation des dossiers

```
lets-cook-simple/
├── src/
│   ├── composants/        # Composants réutilisables
│   │   ├── auth/         # Authentification
│   │   ├── boutons/      # Boutons communs
│   │   ├── filtres/      # Système de filtrage
│   │   └── ui/          # Interface utilisateur
│   ├── hooks/           # Hooks personnalisés
│   ├── pages/           # Pages principales
│   └── styles/          # Fichiers CSS
├── public/             # Fichiers statiques
└── package.json       # Dépendances
```

##  Comment contribuer

Nous accueillons toutes les contributions ! Pour participer :

1. Faites un fork du projet
2. Créez votre branche (`git checkout -b feature/Nouvellefonctionnalite`)
3. Faites vos modifications
4. Validez vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
5. Poussez vers votre fork (`git push origin feature/Nouvellefonctionnalite`)
6. Ouvrez une Pull Request

##  Ressources utiles

- [Documentation React en français](https://fr.reactjs.org/)
- [Guide Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs en français](https://developer.mozilla.org/fr/)

---

Créé avec  par l'équipe Let's Cook Simple
