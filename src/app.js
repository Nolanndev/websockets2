// Configuration et initialisation de l'application Express (middlewares, parsers, routes)

import cors from "cors";
import express from "express";

import UserService from "./services/UserService.js";

const app = express();

/**
 * ======================
 * Middlewares
 * ======================
 */

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

/**
 * ======================
 * Routes
 * ======================
 */

app.get("/api/users", (req, res) => {
	// console.log(UserService.getUsers());
	let users = UserService.getUsers();
	for (let user of users) {
		console.log(user.username, user.lat, user.long);
	}
	console.log("---");
	res.json(UserService.getUsers());
});

/**
 * ======================
 * Gestion des Erreurs
 * ======================
 */

// Middleware pour gérer les erreurs 404 (route non trouvée)
app.use((req, res, next) => {
	res.status(404).json({ error: "Endpoint non trouvé" });
	logger.error(`Erreur 404 sur l'URL : ${req.originalUrl}`);
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message,
		// En production, il est préférable de ne pas exposer les détails de l'erreur
		error: process.env.NODE_ENV === "production" ? {} : err,
	});
});

export default app;
