import { messageSocketTypes } from "./constants.js";
import MapService from "./map.js";
import SocketService from "./socket.js";
import VideoService from "./video-service.js";

const formElement = document.getElementById("join-form");
const containerElement = document.getElementById("container");
const leaveElement = document.getElementById("leave");
const usernameElement = document.querySelector('#join-form input[name="username"]');


let username;
let socketService;
let mapService;
let videoService;

// 
formElement.addEventListener("submit", (e) => {
	e.preventDefault();
	
	
	username = usernameElement.value;
	socketService = new SocketService();

	navigator.geolocation.getCurrentPosition((pos) => {
		socketService.sendMessage(
			JSON.stringify({
				type: messageSocketTypes.JOIN,
				username: username,
				lat: pos.coords.latitude,
				long: pos.coords.longitude,
			})
		);
		mapService = new MapService(socketService, pos.coords.latitude, pos.coords.longitude);
	});

	videoService = new VideoService(socketService);
	
	formElement.style.display = "none";
	containerElement.style.display = "block";

});

leaveElement.addEventListener("click", () => {
	socketService.socket.disconnect();
	mapService.stop();
	videoService.stop();
	containerElement.style.display = "none";
	formElement.style.display = "block";
});

document.getElementById('chat').addEventListener('submit', sendMessage);
function sendMessage(e) {
	e.preventDefault();
	let val = document.getElementById('message').value;
	if (val === '') return;
	socketService.sendMessage(JSON.stringify({
		type: 8,
		content: val,
	}));
	document.getElementById('message').value = '';
	
}