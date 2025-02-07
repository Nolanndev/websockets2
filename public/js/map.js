const mapElement = document.getElementById("map");

class MapService {
	constructor() {
		this.map = L.map("map").setView(
			[48.741073599999616, -0.39139883999960784],
			10,
		);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(this.map);
		this.markers = {};

		// this.updateMap = this.updateMap.bind(this);

		this.updateMap();
		setInterval(this.updateMap, 1000);
	}

	addMarker(username, latitude, longitude) {
		let marker = L.marker([latitude, longitude]).addTo(this.map);
		marker.on("click", () => {
			// console.log('Click sur le point');
		});
		marker.on("mouseover", () => {
			// console.log('Survole du point');
		});
		// this.markers.push(marker);
		marker.bindTooltip(username, {
			permanent: false,
			direction: 'top',
		});
	}

	removeMarker() {
		console.log("Suppression du point");
	}

	updateMap = () => {
		fetch("/api/users")
			.then((response) => response.json())
			.then((data) => {
				data.forEach((user) => {
					// console.log(user)
					this.addMarker(user.username, user.lat, user.long);
				});
			});
	};

	stop() {
		clearInterval(this.updateMap);
	}
}

export default MapService;
