
# Structure du Projet

Ce projet suit une architecture de développement modulaire avec une séparation front-end / back-end. Voici une description détaillée des différentes parties du projet :

## Back-end - Laravel

Laravel est un framework back-end écrit en PHP qui suit le modèle d'architecture MVC (Modèle-Vue-Contrôleur). Les composants principaux de Laravel dans ce projet sont situés dans le répertoire `backend` :

- **`app`** : Le cœur de l'application Laravel, contenant la majorité de la logique métier.
  - **`Console`** : Contient les commandes Artisan personnalisées. Artisan est un outil en ligne de commande fourni par Laravel pour effectuer diverses tâches.
  - **`Exceptions`** : Gestionnaires d'exceptions de l'application.
  - **`Http`** : Contient les contrôleurs (`Controllers`), les intergiciels (`Middleware`) et d'autres composants de traitement de requête.
    - **`Controllers`** : Responsables du traitement des requêtes utilisateurs et de la génération des réponses. Dans le modèle MVC, les contrôleurs reçoivent les entrées, appellent les modèles et les vues nécessaires pour exécuter la demande de l'utilisateur.
    - **`Middleware`** : Filtres exécutés avant ou après le traitement des requêtes par les gestionnaires de requêtes.
  - **`Models`** : Fichiers de modèle correspondant aux tables de la base de données, utilisés pour interagir avec la base de données.

- **`bootstrap`** : Contient les scripts de démarrage et de chargement automatique de l'application.

- **`config`** : Tous les fichiers de configuration de l'application.

- **`database`** : Fichiers liés à la base de données, tels que les migrations (`migrations`), les usines de modèles (`factories`) et les graines de données (`seeds`).

- **`public`** : Ressources publiques comme les fichiers JavaScript, CSS, images et le fichier d'entrée `index.php`. C'est le point d'entrée pour les utilisateurs front-end.

- **`resources`** :
  - **`lang`** : Fichiers de langues pour le support multilingue et la localisation.
  - **`views`** : Fichiers de vue utilisés pour générer l'interface utilisateur, généralement des templates HTML.

- **`routes`** : Définitions des routes de l'application, mappant les requêtes aux actions des contrôleurs.

- **`storage`** : Fichiers générés par le framework et les fichiers téléchargés par les utilisateurs, tels que les logs, les caches et les sessions.

- **`tests`** : Code de test, comme les tests de fonctionnalités et les tests unitaires.

- **`vendor`** : Bibliothèques tierces installées via Composer.

## Front-end - Backbone.js

Backbone.js est une bibliothèque JavaScript légère pour le développement d'applications monopages (SPA). Elle fournit des modèles (`Models`), des collections (`Collections`), des vues (`Views`) et des routeurs (`Routers`) pour organiser le code.

- **`dist`** : Contient les fichiers construits, comme les fichiers JavaScript et CSS fusionnés et minifiés.

- **`images`** : Ressources d'images utilisées dans le front-end.

- **`src`** : Répertoire source.
  - **`app.js`** : Fichier d'entrée de l'application, utilisé généralement pour initialiser l'application et configurer les routeurs.
  - **`collections`** : Fichiers de collection, utilisés pour gérer des groupes de modèles et interagir avec le serveur.
  - **`index.html`** : Page principale de l'application monopage.
  - **`models`** : Fichiers de modèle, représentant les données et la logique métier, généralement en correspondance avec les enregistrements de la base de données côté serveur.
  - **`routers`** : Fichiers de routage, contrôlant le basculement entre les pages et la gestion des URL.
  - **`utils`** : Fonctions utilitaires.
  - **`views`** : Fichiers de vue, responsables du rendu des données des modèles dans les templates HTML et de la gestion des interactions utilisateur.

- **`styles`** : Fichiers de style CSS.
