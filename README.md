# inscription

## Bienvenue dans votre projet web statique !

Ce projet a été généré avec **Germin**, un outil CLI pour créer rapidement des projets web statiques avec une structure organisée et une application Kanban pour gérer vos tâches. Ce README vous guide à travers l'installation, l'utilisation et le développement de votre projet.

### Prérequis

- **Node.js** (version 16 ou supérieure) : [Télécharger](https://nodejs.org)
- **Git** (optionnel, pour la gestion de version) : [Télécharger](https://git-scm.com)

### Installation

1. **Naviguez dans le dossier du projet** :
   ```bash
   cd inscription
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

### Utilisation

#### Lancer le serveur de développement
Pour prévisualiser votre projet localement :

```bash
npm run dev
```

- Ouvre votre navigateur à `http://localhost:3000` pour voir la page principale.
- Visitez `http://localhost:3000/x/app` pour accéder à l'application Kanban.

#### Gérer les tâches avec l'application Kanban
- Accédez à `http://localhost:3000/x/app`.
- **Ajoutez des tâches** : Remplissez le formulaire avec un titre, une description et une priorité (Urgent/Normal).
- **Déplacez les tâches** : Glissez-déposez les tâches entre les colonnes "À faire", "En cours" et "Terminé".
- **Suivez le temps investi** : Utilisez le chronomètre pour mesurer le temps passé sur le projet.
- **Importez/Exportez** : Importez des tâches via un fichier JSON ou réinitialisez toutes les tâches.

#### Construire le projet pour la production
Pour générer une version optimisée du projet :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`, prêts pour le déploiement.

#### Déployer sur GitHub Pages
Si vous avez initialisé Git et configuré un dépôt GitHub :

```bash
npm run deploy
```

Votre projet sera déployé sur GitHub Pages.

### Développement

- **Éditer les fichiers** :
  - Modifiez `index.html` pour le contenu principal.
  - Personnalisez `public/css/style.css` pour les styles.
  - Ajoutez du code dans `public/js/script.js` pour les interactions dynamiques.
  - Créez des pages supplémentaires dans `public/pages/` si activé.
  - Gérez vos tâches dans `public/trello/app.html`.
  - Remplacez `public/assets/images/favicon.png` par votre propre favicon si nécessaire.

- **Ajouter des ressources** :
  - Placez les images ou autres fichiers dans `public/assets/images/` si activé.

**Généré avec 💚 par Germin**