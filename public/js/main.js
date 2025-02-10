/**
 * Importation des constantes et des services nécessaires :
 * - messageSocketTypes : enumération décrivant les types de messages Socket
 * - MapService : gère l'affichage et les interactions avec la carte
 * - SocketService : gère la connexion et la communication via Socket.IO
 * - VideoService : gère la diffusion/streaming vidéo
 */
import { messageSocketTypes } from "./constants.js";
import MapService from "./map.js";
import SocketService from "./socket.js";
import VideoService from "./video-service.js";

/**
 * Récupération des éléments du DOM :
 * - Le formulaire de connexion (join-form)
 * - Le conteneur principal (container)
 * - Le bouton permettant de se déconnecter (leave)
 * - Le champ de saisi du nom d'utilisateur (username)
 */
const formElement = document.getElementById("join-form");
const containerElement = document.getElementById("container");
const leaveElement = document.getElementById("leave");
const usernameElement = document.querySelector(
	'#join-form input[name="username"]',
);

/**
 * Variables globales pour stocker :
 * - le nom d'utilisateur
 * - l'instance du SocketService
 * - l'instance du MapService
 * - l'instance du VideoService
 */
let username;
let socketService;
let mapService;
let videoService;

/**
 * Événement déclenché lors de la soumission du formulaire "join-form"
 * - Empêche le rafraîchissement de la page
 * - Récupère le nom d'utilisateur saisi
 * - Initialise le socketService (connexion Socket.IO)
 * - Récupère la position géographique de l'utilisateur
 * - Envoie un message de type JOIN avec le nom d'utilisateur et sa position
 * - Instancie et initialise le MapService (affichage de la carte)
 * - Instancie et initialise le VideoService (gestion vidéo)
 * - Met à jour l'affichage (cache le formulaire et montre le conteneur principal)
 */
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

/**
 * Événement déclenché lors du clic sur le bouton "leave"
 * - Déconnecte le socket
 * - Arrête les services de carte et de vidéo
 * - Met à jour l'affichage (masque le conteneur et réaffiche le formulaire)
 */
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
document.getElementById("chat").addEventListener("submit", sendMessage);

/**
 * Fonction pour envoyer un message via le socket
 * @param {Event} e - Événement de soumission du formulaire
 */
function sendMessage(e) {
	e.preventDefault();

	// Récupère le contenu du message
	let val = document.getElementById("message").value;

	// Vérifie si le champ est vide
	if (val === "") return;

	// Envoi d'un message de type 8 (chat) via le socket
	socketService.sendMessage(
		JSON.stringify({
			type: 8,
			content: val,
		}),
	);

	// Réinitialise le champ de texte
	document.getElementById("message").value = "";
}
