/**
 * MapService
 * ----------
 * Cette classe gère l'affichage d'une carte (via la librairie Leaflet),
 * ainsi que l'ajout et la suppression de marqueurs pour chaque utilisateur connecté.
 */
class MapService {
	/**
	 * Constructeur de MapService
	 * @param {object} socketService - Instance de SocketService (non utilisée directement ici)
	 * @param {number} latOrigin     - Latitude d'origine pour centrer la carte
	 * @param {number} longOrigin    - Longitude d'origine pour centrer la carte
	 */
	constructor(socketService, latOrigin, longOrigin) {
		// On stocke le service de socket (pouvant servir pour des actions futures)
		this.socketService = socketService;

		// Initialisation de la carte Leaflet, en centrant sur les coordonnées passées en paramètres
		this.map = L.map("map").setView([latOrigin, longOrigin], 12);

		// Définition de la couche de tuiles (OpenStreetMap)
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(this.map);

		// Dictionnaire pour garder la référence des marqueurs (key = userId, value = marker Leaflet)
		this.markers = {};

		// Première mise à jour de la carte
		this.updateMap();

		// Mise à jour périodique de la carte toutes les secondes
		setInterval(this.updateMap, 1000);
	}

	/**
	 * Ajoute un marqueur pour un nouvel utilisateur.
	 * @param {object} user - Contient au moins les champs "lat", "long", "username", "id"
	 */
	addMarker(user) {
		// Création du marqueur à partir des coordonnées de l'utilisateur
		let marker = L.marker([user.lat, user.long]).addTo(this.map);

		// Affichage d'une info-bulle (toolTip) lors du survol
		marker.bindTooltip(user.username, {
			permanent: false,
			direction: "top",
		});

		// On stocke ce marqueur dans l'objet markers
		this.markers[user.id] = marker;
	}

	/**
	 * Supprime le marqueur d'un utilisateur spécifique.
	 * @param {string} userId - Identifiant de l'utilisateur
	 */
	removeMarker(userId) {
		// Si un marqueur existe pour cet utilisateur, on le retire de la carte et on le supprime de la liste
		if (this.markers[userId]) {
			this.map.removeLayer(this.markers[userId]);
			delete this.markers[userId];
		}
	}

	/**
	 * Méthode permettant de récupérer la liste des utilisateurs depuis l'API,
	 * d'ajouter/supprimer les marqueurs correspondants, et de mettre à jour l'affichage.
	 */
	updateMap = () => {
		fetch("/api/users")
			.then((response) => response.json())
			.then((data) => {
				// Sélectionne l'élément HTML qui affichera la liste des utilisateurs
				let usersElement = document.getElementById("users");
				usersElement.innerHTML = "";

				// Supprime les marqueurs associés aux utilisateurs qui ne sont plus présents dans la liste
				Object.keys(this.markers).forEach((userId) => {
					// Si le userId n'apparaît pas dans la nouvelle liste, on retire le marqueur
					if (!data.find((user) => user.id === userId)) {
						this.removeMarker(userId);
					}
				});

				// Trie la liste avant l'affichage (par username, par exemple)
				data.sort((a, b) => a.username > b.username);

				// Met à jour ou ajoute les marqueurs pour chaque utilisateur encore connecté
				data.forEach((user) => {
					if (this.markers[user.id]) {
						// Si le marqueur existe, on met simplement à jour ses coordonnées
						this.markers[user.id].setLatLng([user.lat, user.long]);
					} else {
						// Sinon, on crée un nouveau marqueur
						this.addMarker(user);
					}

					// On ajoute la ligne descriptive de l'utilisateur dans la liste
					usersElement.innerHTML += `<li>${user.username} : ${user.lat}, ${user.long}</li>`;
				});
			});
	};

	/**
	 * stop
	 * ----
	 * Permet d'arrêter la mise à jour périodique et de supprimer éventuellement la carte.
	 * Ici, on se contente de nettoyer l'intervalle.
	 */
	stop() {
		// clearInterval va arrêter les appels répétés à la fonction updateMap
		clearInterval(this.updateMap);

		// Optionnel : retire la carte si besoin
		// this.map.remove();
	}
}

export default MapService;
