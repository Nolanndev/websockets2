/**
 * SocketService
 *
 * Cette classe gère la communication avec un serveur Socket.IO.
 * Elle permet d'envoyer des messages (immédiatement ou lorsqu'une connexion est établie)
 * et de recevoir des messages diffusés par le serveur.
 *
 * @param {string} customMessage - Message personnalisé envoyé dès la connexion
 * @param {string} url - URL du serveur Socket.IO (par défaut http://localhost:8080)
 */

class SocketService {
	/**
	 * Constructeur de la classe SocketService
	 * @param {string} customMessage - Message personnalisé à envoyer lors de la connexion
	 * @param {string} url - L'URL du serveur Socket.IO
	 */
	constructor(customMessage, url = "http://localhost:8080") {
		// Stocker l'URL du serveur
		this.url = url;

		// Stocker le message personnalisé
		this.customMessage = customMessage;

		// Instance de Socket.IO (restera nulle jusqu'à l'initialisation)
		this.socket = null;

		// Tableau pour conserver les messages à envoyer quand la connexion n'est pas encore établie
		this.pendingMessages = [];

		// Initialiser la connexion Socket.IO
		this.initializeSocket();
	}

	/**
	 * Initialise la connexion à Socket.IO et configure les différents événements
	 */
	initializeSocket() {
		// Création de la connexion Socket.IO
		this.socket = io(this.url);

		// Dès que la connexion est établie
		this.socket.on("connect", () => {
			// Si un message personnalisé est défini, on l'envoie immédiatement
			if (this.customMessage) {
				this.socket.send(this.customMessage);
			}

			// Envoyer les messages qui étaient en attente de connexion
			while (this.pendingMessages.length > 0) {
				const message = this.pendingMessages.shift();
				this.socket.send(message);
			}
		});

		// Réception d'un message émis depuis le serveur
		this.socket.on("message", (data) => {
			// Parser le message reçu en format JSON
			data = JSON.parse(data);

			// Vérifier si le type correspond à un type particulier (8 dans cet exemple)
			if (data.type === 8) {
				// Récupérer la boîte de chat du DOM
				let chatbox = document.getElementById("chatbox");

				// Créer un nouvel élément pour afficher le message
				const message = document.createElement("p");
				message.innerText = data.from + " - " + data.content;
				chatbox.appendChild(message);

				// Faire défiler la boîte de chat vers le bas
				chatbox.scrollTop = chatbox.scrollHeight;
			}
		});

		// Gestion des erreurs de connexion
		this.socket.on("connect_error", (error) => {
			console.error("Erreur de connexion Socket.IO :", error);
		});

		// Quand le serveur ou le client ferme la connexion
		this.socket.on("disconnect", (reason) => {
			console.log("Connexion Socket.IO fermée :", reason);
		});
	}

	/**
	 * Méthode d'envoi d'un message
	 * @param {string|object} message - Le message à envoyer au serveur
	 */
	sendMessage(message) {
		// Vérifier si la connexion est déjà établie
		if (this.socket && this.socket.connected) {
			// Envoi direct du message
			this.socket.send(message);
		} else {
			// Sinon, on stocke le message pour l'envoyer plus tard
			this.pendingMessages.push(message);
		}
	}

	/**
	 * Fermer la connexion Socket.IO
	 */
	closeConnection() {
		if (this.socket) {
			this.socket.close();
			console.log("Fermeture de la connexion Socket.IO demandée");
		}
	}
}

export default SocketService;
