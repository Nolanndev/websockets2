class SocketService {
	constructor(customMessage, url = 'ws://localhost:8080') {
		this.url = url;
		this.customMessage = customMessage;
		this.socket = null;
		this.pendingMessages = [];
		this.initializeSocket();
	}

	initializeSocket() {
		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {

			// Envoi du message personnalisé dès l'ouverture
			if (this.customMessage) {
				this.socket.send(this.customMessage);
			}

			// Envoi des messages en attente (le cas échéant)
			while (this.pendingMessages.length > 0) {
				const message = this.pendingMessages.shift();
				this.socket.send(message);
				console.log(`Message en file d'attente envoyé : ${message}`);
			}
		};

		// Gestion de la réception des messages
		this.socket.onmessage = (event) => {
            event.data.text()
            .then(text => {
                console.log("Message reçu depuis le serveur :", text);
            })
		};

		// Gestion des erreurs
		this.socket.onerror = (error) => {
			console.error("Erreur WebSocket :", error);
		};

		// Gestion de la fermeture de la connexion
		this.socket.onclose = (event) => {
			console.log("Connexion WebSocket fermée", event);
		};
	}

	sendMessage(message) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
			console.log(`Message envoyé : ${message}`);
		} else {
			// Ajoute le message à la file d'attente si le socket n'est pas prêt
			this.pendingMessages.push(message);
			console.log(`Message mis en attente : ${message}`);
		}
	}

	closeConnection() {
		if (this.socket) {
			this.socket.close();
			console.log("Fermeture de la connexion WebSocket demandée");
		}
	}
}

export default SocketService;
