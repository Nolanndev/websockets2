
import { messageSocketTypes } from "./constants.js";
import MapService from "./map.js";
import SocketService from "./socket.js";
import VideoService from "./video-service.js";

/**
 * ===================================
 * Récupération des éléments du DOM
 * ===================================
 */
const formElement = document.getElementById("join-form");
const containerElement = document.getElementById("container");
const leaveElement = document.getElementById("leave");
const usernameElement = document.querySelector(
	'#join-form input[name="username"]',
);

/**
 * =====================
 * Variables globales
 * =====================
 */
let username;
let socketService;
let mapService;
let videoService;

// Soumission du formulaire de connexion
formElement.addEventListener("submit", (e) => {
	e.preventDefault();

	// Récupérer le nom d'utilisateur depuis le champ correspondant
	username = usernameElement.value;

	// Initialiser la connexion Socket.IO
	socketService = new SocketService();

	// Récupérer la position GPS
	navigator.geolocation.getCurrentPosition((pos) => {
		// Envoi d'un message de type JOIN via le socket
		socketService.sendMessage(
			JSON.stringify({
				type: messageSocketTypes.JOIN,
				username: username,
				lat: pos.coords.latitude,
				long: pos.coords.longitude,
			}),
		);

		// Création et initialisation du service de carte
		mapService = new MapService(
			socketService,
			pos.coords.latitude,
			pos.coords.longitude,
		);
	});

	

	// Création et initialisation du service vidéo
	videoService = new VideoService(socketService);

	// Gestion de l'affichage : on masque le formulaire et on affiche le conteneur
	formElement.style.display = "none";
	containerElement.style.display = "block";
});

// connexion de l'utilisateur
leaveElement.addEventListener("click", () => {
	// Déconnexion du socket
	socketService.socket.disconnect();

	// Arrêt de la carte et de la vidéo
	mapService.stop();
	videoService.stop();

	// Mise à jour de l'affichage
	containerElement.style.display = "none";
	formElement.style.display = "block";
});

/**
 * Ajout d'un écouteur sur le formulaire "chat"
 * - On appelle la fonction sendMessage lors de la soumission
 */
document.getElementById("chat").addEventListener("submit", (e) => {
	e.preventDefault();

	// Récupère le contenu du message
	let val = document.getElementById("message").value;

	// Vérifie si le champ est vide
	if (val === '') return;

	// Envoi d'un message de type 8 (chat) via le socket
	socketService.sendMessage(
		JSON.stringify({
			type: 'chat-message',
			content: val,
		}),
	);

	// Réinitialise le champ de texte
	document.getElementById("message").value = "";
});


