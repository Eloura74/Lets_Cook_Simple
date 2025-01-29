# Let's Cook - Version Simplifiée

Ce projet est une version simplifiée de l'application Let's Cook, conçue pour être plus accessible aux développeurs débutants tout en conservant les fonctionnalités essentielles et le design original.

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le projet en mode développement :
```bash
npm run dev
```

## Structure du Projet

- `/src/components/` : Contient tous les composants React
  - `/auth/` : Composants d'authentification
  - `/buttons/` : Boutons réutilisables
  - `/common/` : Composants communs (Header, etc.)
  - `/ui/` : Éléments d'interface utilisateur

- `/src/pages/` : Pages principales de l'application
- `/src/styles/` : Fichiers CSS et styles Tailwind

## Fonctionnalités Principales

- Authentification simplifiée (login/register)
- Navigation responsive
- Affichage des recettes
- Interface utilisateur moderne avec Tailwind CSS

## Technologies Utilisées

- React
- React Router
- Tailwind CSS
- React Icons

## Différences avec la Version Complète

Cette version a été simplifiée en :
- Supprimant les contexts React complexes
- Simplifiant la gestion des états
- Réduisant la gestion des erreurs
- Utilisant le localStorage pour l'authentification
- Gardant les données en dur pour les recettes
