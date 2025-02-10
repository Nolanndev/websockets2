# Discut

Discut (prononcé "Discute") est une petite application de chatting en temps réel. Vous pouvez discuter et voir les autres partipants en temps réel sur la carte.

Ce projet combine l'utilisation de **Node.js**, **Express**, **Socket.IO** et **Leaflet** pour créer une application de chatting en temps réel.

- **Express** sert des routes API et des fichiers statiques (client web).
- **Socket.IO** gère la communication temps réel pour le chat, la synchronisation des positions et la gestion des appels vidéo (préparation WebRTC).
- **Leaflet** affiche une carte dynamique où sont placés des marqueurs pour chaque utilisateur connecté.

---

## Sommaire

1. [Fonctionnalités](#fonctionnalités)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Utilisation](#utilisation)
5. [Arborescence du projet](#arborescence-du-projet)

---

## Fonctionnalités

- **Authentification simple via socket** : Lorsqu'un utilisateur rejoint, son nom et sa position géographique sont envoyés au serveur via Socket.IO.
- **Carte interactive** : Grâce à Leaflet, chaque utilisateur connecté est représenté par un marqueur mis à jour en temps réel.
- **Chat en temps réel** : Les utilisateurs peuvent discuter instantanément. Les messages sont diffusés via Socket.IO.
- **Logs** : Le système de logs est configurable pour afficher des logs colorés en console et les enregistrer dans un fichier texte.

---

## Installation

1. **Cloner le dépôt**

    ```bash
    git clone https://github.com/Nolanndev/websockets2.git
    cd websockets2
    ```

2. Installer les dépendances

    ```bash
    npm install
    ```

3. Démarrer le serveur

    ```bash
    npm run start
    ```

## Utilisation

1. Lancer le serveur.
2. Ouvrir le navigateur sur <http://localhost:8080>.

### Rejoindre la discussion

Lorsque vous lancez le serveur, vous arrivez sur une page qui vous demande un nom d'utilisateur. Saisissez le votre pour rejoindre la discussion globale.

### Voir les autres participants sur la carte

Vous pouvez voir en temps réel la position des autres participants sur une carte interactive. Vous pouvez voir les noms d'utilisateur de chaque participant en survolant leur point sur la carte.

### Enovyer des messages

Pour envoyer des messages dans le chat, vous devez simplement entrer le message que vous voulez envoyer dans l'input associé et soumettre le formulaire d'envoi. Le message sera alors envoyé à tous les participants.

### Quitter la discussion

Pour quitter la discussion, vous devez cliquer sur le bouton 'quitter' en bas de la page. Vous serez alors déconnectés de la discussion.

## Architecture

```text
.
├── config/             // configuration du projet
│   └─ config.js
├── public/             // côté client
│   ├─ css/
│   ├─ js/
│   └─ index.html
└── src/                // côté serveur
    ├─ services/
    ├─ utils/
    ├─ app.js
    ├─ server.js
    └─ constants.js
```

## Documentation technique

La documentation technique complète se trouve dans le répertoire _docs/_

Pour y a voir accès, ouvrir le fichier _index.html_ dans votre navigateur, ou lancer un serveur http depuis le répertoire.
