# Découverte des WEBSOCKETS

### Structure du projet V2

```text
real-time-app/
├── package.json
├── README.md
├── config/
│   └── index.js           # Configuration générale (ports, clés, variables d'environnement, etc.)
├── src/
│   ├── app.js             # Configuration et initialisation de l'application Express (middlewares, parsers, routes)
│   ├── server.js          # Point d'entrée qui démarre le serveur HTTP et attache les WebSockets (ex: avec Socket.IO)
│   ├── api/               # Logique REST de l’application
│   │   ├── routes/
│   │   │   ├── userRoutes.js         # Routes pour la gestion des utilisateurs
│   │   │   ├── locationRoutes.js     # Routes pour la géolocalisation (historique, etc.)
│   │   │   ├── accelerometerRoutes.js# Routes pour récupérer ou historiser les données d’accéléromètre
│   │   │   └── videoRoutes.js        # Routes éventuelles pour la partie visioconférence (par exemple pour gérer la signalisation)
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── locationController.js
│   │   │   ├── accelerometerController.js
│   │   │   └── videoController.js
│   │   └── services/
│   │       ├── userService.js
│   │       ├── locationService.js     # Logique métier pour traiter les mises à jour de positions
│   │       ├── accelerometerService.js# Logique métier pour traiter les données d’accéléromètre
│   │       └── videoService.js        # Logique métier pour la signalisation ou le contrôle de la visioconférence
│   ├── sockets/           # Gestion des WebSockets pour la communication temps réel
│   │   ├── index.js                # Initialisation de la connexion Socket.IO et répartition vers les modules dédiés
│   │   ├── locationSocket.js       # Gestion des événements liés aux positions GPS (ex: "updateLocation")
│   │   ├── accelerometerSocket.js  # Gestion des événements des accéléromètres (ex: "updateAccelerometer")
│   │   └── videoSocket.js          # Gestion des événements pour la visioconférence (ex: "video-offer", "video-answer", "candidate")
│   ├── models/            # Modèles de données (pour une base de données, par exemple avec Mongoose)
│   │   ├── user.js
│   │   ├── location.js
│   │   └── accelerometer.js
│   └── utils/             # Fonctions utilitaires (logger, helpers, etc.)
│       └── logger.js
├── public/                # Fichiers statiques (HTML, CSS, JS côté client, images, etc.)
│   ├── index.html
│   ├── js/
│   │   ├── main.js         # Initialisation générale côté client
│   │   ├── map.js          # Logique d'affichage et de mise à jour de la carte
│   │   └── video.js        # Gestion de la visioconférence côté client
│   ├── css/
│   │   └── style.css
│   └── assets/            # Autres ressources (images, icônes, etc.)
└── tests/                 # Tests unitaires et d'intégration
    ├── api/               # Tests pour les routes, controllers et services
    ├── sockets/           # Tests pour la logique des WebSockets
    └── utils/             # Tests pour les utilitaires
```
