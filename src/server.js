import http from "http";
import { Server } from "socket.io";

import config from "../config/config.js";
import { messageSocketTypes } from "../public/js/constants.js";
import app from "./app.js";
import UserService from "./services/UserService.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
	socket.on("message", (message) => {
		message = JSON.parse(message);

		switch (message.type) {
			case messageSocketTypes.JOIN:
				UserService.addUser(socket.id, message);
				break;
			default:
				logger.warn("message non reconnu");
				break;
		}
	});

	socket.on("close", () => {
		UserService.deleteUser(socket.id);
		logger.info("Déconnexion WebSocket");
	});

	socket.on("disconnect", () => {
		UserService.deleteUser(socket.id);
		logger.info("Déconnexion WebSocket");
	});

	socket.on("error", (error) => {
		logger.error(`Erreur WebSocket : ${error}`);
	});
});

const PORT = config.port || process.env.PORT || 3000;
server.listen(PORT, () => {
	logger.info(`Serveur HTTP ${PORT}`);
});
