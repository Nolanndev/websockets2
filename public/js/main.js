import { messageSocketTypes } from "./constants..js";
import MapService from "./map.js";
import SocketService from "./socket.js";

const formElement = document.getElementById("join-form");
const containerElement = document.getElementById("container");
const leaveElement = document.getElementById("leave");
let usernameElement = document.querySelector('#join-form input[name="username"]');
let chatElement = document.getElementById("chat");

let username;
let socket;
let mapService;

formElement.addEventListener("submit", (e) => {
	e.preventDefault();

	username = usernameElement.value;
	navigator.geolocation.getCurrentPosition((pos) => {
		socket = new SocketService(
			JSON.stringify({
				type: messageSocketTypes.JOIN,
				username: username,
				lat: pos.coords.latitude,
				long: pos.coords.longitude,
			}),
		);

		setInterval(() => {
			fetch("/api/users")
				.then((response) => response.json())
				.then((data) => {
					chatElement.innerHTML = '<ul>';
					
					data.forEach((user) => {
						// console.log(user)
						console.log(user.username, user.lat, user.long);
						chatElement.innerHTML += `<li>${user.username} : ${user.lat}, ${user.long}</li>`
					});

					chatElement.innerHTML += '</ul>';
				});
		}, 1000);
	});

	formElement.style.display = "none";
	containerElement.style.display = "block";

	mapService = new MapService();
});

leaveElement.addEventListener("click", () => {
	socket.socket.disconnect();
	mapService.stop();
	containerElement.style.display = "none";
	formElement.style.display = "block";
});
