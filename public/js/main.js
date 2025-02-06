

// import webSocket from "./socket.js";
import { messageSocketTypes } from "./constants..js";
import MapService from "./map.js";
import SocketService from "./socket.js";

const formElement = document.getElementById('join-form');
const containerElement = document.getElementById('container');
const leaveElement = document.getElementById('leave');
let usernameElement = document.querySelector('#join-form input[name="username"]');


let username;
let socket;


formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    username = usernameElement.value;
    navigator.geolocation.getCurrentPosition(pos => {
        socket = new SocketService(JSON.stringify({
            type: messageSocketTypes.JOIN,
            username: username, 
            lat: pos.coords.latitude, 
            long: pos.coords.longitude
        }));
    });

    formElement.style.display = 'none';
    containerElement.style.display = 'block';

    const map = new MapService();
    map.addMarker(48.741073599999616, -0.39139883999960784);
});

leaveElement.addEventListener('click', () => {
    socket.close();
    containerElement.style.display = 'none';
    formElement.style.display = 'block';
});

