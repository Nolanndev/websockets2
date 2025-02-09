// import http from "http";
// import { Server } from "socket.io";

// import config from '../config/config.js';
// import app from "./app.js";
// import { messageSocketTypes } from './constants.js';
// import UserService from "./services/UserService.js";
// import logger from "./utils/logger.js";
// // import pino from 'pino';
// // const logger = pino();

// const server = http.createServer(app);
// const io = new Server(server);


// io.on("connection", (socket) => {
// 	socket.on("message", (message) => {
// 		message = JSON.parse(message);

// 		switch (message.type) {
// 			case messageSocketTypes.JOIN:
// 				logger.info(`${message.username} s'est connecté`);
// 				UserService.addUser(socket.id, message);
// 				socket.emit('confirmation', `confirmation du serveur; ${socket.id}`);
// 				break;
// 			default:
// 				logger.warn("message non reconnu");
// 				break;
// 		}
// 	});

// 	socket.on("close", () => {
// 		const user = UserService.getUser(socket.id);
// 		UserService.deleteUser(socket.id);
// 		logger.info(`${user.username} s'est déconnecté`);
// 	});

// 	socket.on("disconnect", () => {
// 		const user= UserService.getUser(socket.id);
// 		UserService.deleteUser(socket.id);
// 		logger.info(`${user.username} s'est déconnecté`);
// 	});

// 	socket.on("error", (error) => {
// 		logger.error(`Erreur WebSocket : ${error}`);
// 	});
// });

// const PORT = config.port || process.env.PORT || 3000;
// server.listen(PORT, () => {
// 	logger.info(`Serveur HTTP ${PORT}`);
// });


import http from "http";
import { Server } from "socket.io";
import config from '../config/config.js';
import app from "./app.js";
import { messageSocketTypes } from './constants.js';
import UserService from "./services/UserService.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("message", (message) => {
        try {
            message = JSON.parse(message);
            
            switch (message.type) {
                case messageSocketTypes.JOIN:
                    handleJoin(socket, message);
                    break;
                    
                case messageSocketTypes.CHAT_MESSAGE:
                    handleChatMessage(socket, message);
                    break;
                    
                default:
                    logger.warn("Message non reconnu");
                    break;
            }
        } catch (error) {
            logger.error(`Erreur de traitement du message: ${error}`);
        }
    });

    socket.on("disconnect", () => {
        handleDisconnect(socket);
    });

    socket.on("error", (error) => {
        logger.error(`Erreur WebSocket : ${error}`);
    });
});

function handleJoin(socket, message) {
    logger.info(`${socket.id} (${message.username}) s'est connecté`);
    UserService.addUser(socket.id, message);
}

function handleChatMessage(socket, message) {
    const user = UserService.getUser(socket.id);
    // Diffuser le message à tous les utilisateurs
    io.emit('message', JSON.stringify({
        type: messageSocketTypes.CHAT_MESSAGE,
        from: user.username,
        content: message.content,
    }));
    logger.log(`Message chat de ${user.username}: ${message.content}`);
}

function handleDisconnect(socket) {
    const user = UserService.getUser(socket.id);
    if (user) {
        logger.info(`${user.id} (${user.username}) s'est déconnecté`);
        UserService.deleteUser(socket.id);
    }
}

const PORT = config.port || process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});