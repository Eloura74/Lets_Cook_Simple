# Documentation du Projet Let's Cook 📚

## Table des matières

1. [Introduction](#introduction)
2. [Technologies utilisées](#technologies-utilisées)
3. [Architecture du projet](#architecture-du-projet)
4. [Fonctionnalités détaillées](#fonctionnalités-détaillées)
5. [Guide technique](#guide-technique)
6. [Interface utilisateur](#interface-utilisateur)
7. [Perspectives d'évolution](#perspectives-dévolution)

## Introduction

Let's Cook est une application web moderne dédiée aux passionnés de cuisine. Elle permet aux utilisateurs de découvrir, créer et gérer leurs recettes de cuisine favorites dans une interface intuitive et élégante.

### Objectifs du projet

- Créer une plateforme conviviale pour partager des recettes
- Offrir une expérience utilisateur fluide et responsive
- Faciliter la recherche et l'organisation des recettes
- Permettre la gestion personnalisée des recettes

## Technologies utilisées

### Frontend
- **React** : Bibliothèque JavaScript pour la construction de l'interface utilisateur
- **Tailwind CSS** : Framework CSS pour le style et la mise en page
- **React Icons** : Bibliothèque d'icônes
- **CircleType** : Pour les effets de texte circulaire

### Stockage
- **LocalStorage** : Pour la persistance des données côté client

### Outils de développement
- **Node.js** : Environnement d'exécution JavaScript
- **npm** : Gestionnaire de paquets

## Architecture du projet

### Structure des dossiers

```
lets-cook/
├── src/
│   ├── components/        
│   │   ├── auth/         # Composants d'authentification
│   │   ├── boutons/      # Boutons réutilisables
│   │   ├── filtres/      # Système de filtrage
│   │   └── ui/           # Composants d'interface
│   ├── hooks/            # Hooks personnalisés
│   ├── pages/            # Pages principales
│   └── styles/           # Fichiers CSS
├── public/               # Ressources statiques
└── package.json          # Dépendances
```

### Composants principaux

#### 1. SearchBar (Barre de recherche)
- Recherche en temps réel
- Normalisation des accents
- Suggestions automatiques
- Limite de 5 résultats

#### 2. Filtres
- Tri par date
- Tri par popularité
- Interface intuitive

#### 3. Dashboard (Tableau de bord)
- Gestion des recettes personnelles
- Interface de création de recettes
- Visualisation des recettes

## Fonctionnalités détaillées

### 1. Système de recherche

```javascript
// Exemple de normalisation du texte
const normaliserTexte = (texte) => {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
```

### 2. Gestion des recettes

- Création de nouvelles recettes
- Stockage local des données
- Filtrage et tri

### 3. Interface responsive

- Adaptation automatique à tous les écrans
- Menu mobile optimisé
- Navigation fluide

## Guide technique

### Installation

1. Clonage du projet :
```bash
git clone [URL_DU_PROJET]
```

2. Installation des dépendances :
```bash
npm install
```

3. Lancement du projet :
```bash
npm run dev
```

### Structure d'une recette

```javascript
{
  id: string,
  titre: string,
  description: string,
  difficulte: string,
  tempsPreparation: number,
  ingredients: string[],
  instructions: string[],
  dateCreation: string
}
```

## Interface utilisateur

### Thème de couleurs

- **Fond principal** : #2C3639 (gris foncé chaleureux)
- **Accent** : #A27B5C (marron chaleureux)
- **Texte** : #DCD7C9 (beige clair)

### Classes Tailwind personnalisées

```css
/* Bouton standard */
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

## Perspectives d'évolution

### Fonctionnalités à venir

1. **Système de partage**
   - Partage de recettes entre utilisateurs
   - Système de favoris

2. **Authentification complète**
   - Connexion sécurisée
   - Profils utilisateurs

3. **Statistiques utilisateur**
   - Suivi des recettes créées
   - Analyse des préférences

4. **Gestion avancée des recettes**
   - Modification des recettes existantes
   - Système de catégories
   - Tags et mots-clés

### Améliorations techniques prévues

1. **Performance**
   - Optimisation du chargement
   - Mise en cache des données

2. **Sécurité**
   - Validation des données
   - Protection contre les injections

3. **Interface**
   - Animations fluides
   - Mode sombre
   - Accessibilité améliorée

---

Document créé le 30/01/2025
