

class MapService {
    constructor(socketService, latOrigin, longOrigin) {
        this.socketService = socketService;
        this.map = L.map("map").setView(
            [latOrigin, longOrigin],
            12,
        );
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        this.markers = {};

        this.updateMap();
        setInterval(this.updateMap, 1000);
    }

    addMarker(user) {
        let marker = L.marker([user.lat, user.long]).addTo(this.map);
        
        marker.bindTooltip(user.username, {
            permanent: false,
            direction: 'top',
        });
        
        this.markers[user.id] = marker;
    }

    removeMarker(userId) {
        if (this.markers[userId]) {
            this.map.removeLayer(this.markers[userId]);
            delete this.markers[userId];
        }
    }

    updateMap = () => {
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => {
                let usersElement = document.getElementById('users');
                usersElement.innerHTML = '';
                
                // Supprimer les markers des utilisateurs qui ne sont plus connectés
                Object.keys(this.markers).forEach(userId => {
                    if (!data.find(user => user.id === userId)) {
                        this.removeMarker(userId);
                    }
                });
                
                // Mettre à jour ou ajouter les markers des utilisateurs connectés
                data.sort((a,b) => a.username > b.username);
                data.forEach((user) => {
                    if (this.markers[user.id]) {
                        this.markers[user.id].setLatLng([user.lat, user.long]);
                    } else {
                        this.addMarker(user);
                    }
                    usersElement.innerHTML += `<li>${user.username} : ${user.lat}, ${user.long}</li>`;
                });
            });
    };

    stop() {
        clearInterval(this.updateMap);
        // this.map.remove();
    }
}

export default MapService;