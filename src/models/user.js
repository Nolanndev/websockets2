// Modèles de données

class User {
	constructor(id, username) {
		this.id = id;
		this.username = username;
		this.coords = {
			latitude: 0,
			longitude: 0,
		};
	}
}

export default User;
