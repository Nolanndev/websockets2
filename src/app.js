// // Configuration et initialisation de l'application Express (middlewares, parsers, routes)

// import cors from "cors";
// import express from "express";

// import UserService from "./services/UserService.js";
// import logger from './utils/logger.js';

// const app = express();

// /**
//  * ======================
//  * Middlewares
//  * ======================
//  */

// app.use(cors());
// app.use(express.json());

// app.use(express.static("public"));

// /**
//  * ======================
//  * Routes
//  * ======================
//  */

// app.get("/api/users", (req, res) => {
// 	res.json(UserService.getUsers());
// });

// /**
//  * ======================
//  * Gestion des Erreurs
//  * ======================
//  */

// // Middleware pour gérer les erreurs 404 (route non trouvée)
// app.use((req, res, next) => {
// 	res.status(404).json({ error: "Endpoint non trouvé" });
// 	logger.error(`Erreur 404 sur l'URL : ${req.originalUrl}`);
// });

// // Middleware global de gestion des erreurs
// app.use((err, req, res, next) => {
// 	console.error(err.stack);
// 	res.status(err.status || 500).json({
// 		message: err.message,
// 		// En production, il est préférable de ne pas exposer les détails de l'erreur
// 		error: process.env.NODE_ENV === "production" ? {} : err,
// 	});
// });

// export default app;

// Configuration et initialisation de l'application Express (middlewares, parsers, routes)

import cors from "cors";
import express from "express";

import UserService from "./services/UserService.js";
import logger from "./utils/logger.js";

// On crée une instance Express pour construire notre application.
const app = express();

/**
 * ======================
 * Middlewares
 * ======================
 */

// Active la gestion du Cross-Origin Resource Sharing, permettant à des clients
// d'autres domaines d'accéder à l'API.
app.use(cors());

// Permet de parser automatiquement le corps des requêtes HTTP au format JSON
// et de le stocker dans req.body.
app.use(express.json());

// Définit le répertoire "public" comme dossier statique,
// d'où Express servira les fichiers statiques (images, CSS, JS, etc.).
app.use(express.static("public"));

/**
 * ======================
 * Routes
 * ======================
 */

// Déclare la route GET sur /api/users.
// Retourne au client la liste des utilisateurs gérés par UserService.
app.get("/api/users", (req, res) => {
	res.json(UserService.getUsers());
});

/**
 * ======================
 * Gestion des Erreurs
 * ======================
 */

// Middleware pour gérer les erreurs 404 - route non trouvée
app.use((req, res, next) => {
	res.status(404).json({ error: "Endpoint non trouvé" });
	logger.error(`Erreur 404 sur l'URL : ${req.originalUrl}`);
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		// En production, il est préférable de ne pas exposer les détails de l'erreur.
		error: process.env.NODE_ENV === "production" ? {} : err,
	});
});


export default app;
