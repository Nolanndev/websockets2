/**
 * Importation des modules nécessaires :
 * - http pour créer un serveur HTTP
 * - socket.io pour gérer les connexions en temps réel via WebSocket
 * - Les configurations et services internes
 */
import http from "http";
import { Server } from "socket.io";
import config from "../config/config.js";
import app from "./app.js";
import { messageSocketTypes } from "./constants.js";
import UserService from "./services/UserService.js";
import logger from "./utils/logger.js";

/**
 * Création du serveur HTTP à partir de l'application Express
 */
const server = http.createServer(app);

/**
 * Initialisation de Socket.io en utilisant le serveur HTTP
 */
const io = new Server(server);

/**
 * Écoute de l'événement "connection", déclenché lorsqu'un nouveau client se connecte
 */
io.on("connection", (socket) => {
	/**
	 * Écoute de l'événement "message" :
	 * - On tente de parser le message reçu
	 * - Selon le type du message, on effectue les actions appropriées (JOIN, CHAT_MESSAGE, etc.)
	 * - En cas d'erreur lors du parsing ou du traitement, on loggue un message d'erreur
	 */
	socket.on("message", (message) => {
		try {
			message = JSON.parse(message);

			switch (message.type) {
				case messageSocketTypes.JOIN:
					handleJoin(socket, message);
					break;

				case messageSocketTypes.CHAT_MESSAGE:
					handleChatMessage(socket, message);
					break;

				default:
					logger.warn("Message non reconnu");
					break;
			}
		} catch (error) {
			logger.error(`Erreur de traitement du message: ${error}`);
		}
	});

	// Réception de l'offre WebRTC
	socket.on("webrtc-offer", (offer, senderId) => {
		socket.broadcast.emit("webrtc-offer", offer, senderId);
	});

	// Réception de la réponse WebRTC
	socket.on("webrtc-answer", (answer, senderId) => {
		socket.broadcast.emit("webrtc-answer", answer, senderId);
	});

	// Échange des ICE Candidates
	socket.on("webrtc-ice-candidate", (candidate, senderId) => {
		socket.broadcast.emit("webrtc-ice-candidate", candidate, senderId);
	});

	socket.on("chat-message", (message) => handleChatMessage(socket, message));

	/**
	 * Événement "disconnect" :
	 * - Se déclenche lorsque le client se déconnecte
	 * - On gère la déconnexion et on loggue un message
	 */
	socket.on("disconnect", () => {
		handleDisconnect(socket);
	});

	/**
	 * Événement "error" :
	 * - Permet de récupérer et de logguer les erreurs WebSocket
	 */
	socket.on("error", (error) => {
		logger.error(`Erreur WebSocket : ${error}`);
	});
});

/**
 * Fonction pour gérer l'arrivée d'un nouvel utilisateur
 * @param {object} socket - Le socket représentant la connexion du client
 * @param {object} message - Le message contenant les informations de l'utilisateur
 */
function handleJoin(socket, message) {
	// On loggue l'information que l'utilisateur est connecté
	logger.info(`${socket.id} (${message.username}) s'est connecté`);
	// On enregistre l'utilisateur dans notre service
	UserService.addUser(socket.id, message);
}

/**
 * Fonction pour gérer un message de chat
 * @param {object} socket - Le socket représentant la connexion du client
 * @param {object} message - Le message de chat (contient le texte, l'expéditeur, etc.)
 */
function handleChatMessage(socket, message) {
	// On récupère l'utilisateur correspondant au socket
	const user = UserService.getUser(socket.id);

	// On diffuse le message à tous les clients connectés
	io.emit(
		"message",
		JSON.stringify({
			type: messageSocketTypes.CHAT_MESSAGE,
			from: user.username,
			content: message.content,
		}),
	);

	// On loggue le contenu du message envoyé
	logger.log(`Message chat de ${user.username}: ${message.content}`);
}

/**
 * Fonction pour gérer la déconnexion d'un utilisateur
 * @param {object} socket - Le socket représentant la connexion du client
 */
function handleDisconnect(socket) {
	// On récupère les informations de l'utilisateur
	const user = UserService.getUser(socket.id);

	// Si l'utilisateur existe, on loggue la déconnexion et on le supprime du service
	if (user) {
		logger.info(`${user.id} (${user.username}) s'est déconnecté`);
		UserService.deleteUser(socket.id);
	}
}

/**
 * Lancement du serveur sur le port spécifié dans la configuration ou sur 3000 par défaut
 */
const PORT = config.port || process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Serveur en écoute sur le port ${PORT}`);
});
