class SocketService {
	constructor(customMessage, url = "http://localhost:8080") {
		this.url = url;
		this.customMessage = customMessage;
		this.socket = null;
		this.pendingMessages = [];
		this.initializeSocket();
	}

	initializeSocket() {
		// Initialiser la connexion Socket.IO
		this.socket = io(this.url);

		// Événement déclenché quand la connexion est établie
		this.socket.on("connect", () => {
			// Envoyer un message personnalisé dès la connexion, si présent
			if (this.customMessage) {
				this.socket.send(this.customMessage);
			}

			// Envoyer les messages en attente (s'il y en a)
			while (this.pendingMessages.length > 0) {
				const message = this.pendingMessages.shift();
				this.socket.send(message);
			}
		});

		// Réception des messages (événement par défaut 'message')
		this.socket.on("message", (data) => {
			data = JSON.parse(data)
			if (data.type === 8) {
				let chatbox = document.getElementById('chatbox');
				const message = document.createElement('p');
				message.innerText = data.from + ' - ' + data.content;
				chatbox.scrollTop = chatbox.scrollHeight;
				chatbox.appendChild(message);
			}
		});

		// Gestion des erreurs de connexion
		this.socket.on("connect_error", (error) => {
			console.error("Erreur de connexion Socket.IO :", error);
		});

		// Événement déclenché quand la connexion est fermée
		this.socket.on("disconnect", (reason) => {
			console.log("Connexion Socket.IO fermée :", reason);
		});
	}

	// Méthode pour envoyer un message
	sendMessage(message) {
		// Vérifier si la socket est déjà connectée
		if (this.socket && this.socket.connected) {
			this.socket.send(message);
		} else {
			// Mettre le message en attente si la connexion n'est pas encore établie
			this.pendingMessages.push(message);
		}
	}

	// Méthode pour fermer la connexion
	closeConnection() {
		if (this.socket) {
			this.socket.close();
			console.log("Fermeture de la connexion Socket.IO demandée");
		}
	}
}

export default SocketService;
