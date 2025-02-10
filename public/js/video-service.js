/**
 * Classe VideoService
 *
 * Gère l'accès à la caméra et au microphone de l'utilisateur,
 * et intègre la vidéo dans l'interface. Permet également de définir
 * un point d'entrée pour gérer les événements vidéo via Socket.IO.
 */
class VideoService {
	/**
	 * Constructeur de la classe VideoService
	 * @param {Object} socketService - Instance du service de socket pour la communication en temps réel
	 */
	constructor(socketService) {
		// Stocke la référence au service socket
		this.socket = socketService;

		// Stocke le flux média local (caméra/micro)
		this.localStream = null;

		// Lance la capture du flux média (caméra/micro)
		this.initializeMedia();

		// Exemple de gestion d'un événement "video" reçu via Socket.IO
		socketService.socket.on("video", () => {
			console.log("video");
		});
	}

	/**
	 * Demande l'autorisation d'utiliser la caméra et le micro via l'API WebRTC
	 * Crée un élément <video> pour afficher le flux local
	 * @returns {boolean} Indique si l'accès au média a été réussi ou non
	 */
	async initializeMedia() {
		try {
			// Demande l'accès à la caméra et au micro
			this.localStream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});

			// Crée un élément vidéo pour lire le flux local
			const localVideo = document.createElement("video");
			localVideo.autoplay = true; // Lance la lecture automatiquement
			localVideo.srcObject = this.localStream; // Associe le flux média à la source vidéo
			localVideo.muted = true; // Coupe le son local pour éviter l'écho

			// Ajoute la balise vidéo dans l'élément DOM avec l'ID "videos"
			document.getElementById("videos").appendChild(localVideo);

			return true;
		} catch (err) {
			// En cas d'erreur (refus d'accès ou autre)
			console.error("Erreur accès média:", err);
			return false;
		}
	}

	/**
	 * Stoppe la capture de la caméra/micro
	 * (Peut être implémenté en arrêtant les tracks du localStream)
	 */
	stop() {
		// À implémenter : arrête les pistes (audio et vidéo) du localStream
		// Exemple :
		// if (this.localStream) {
		//     this.localStream.getTracks().forEach(track => track.stop());
		// }
	}
}

export default VideoService;
