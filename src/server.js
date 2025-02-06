import http from 'http';
import { WebSocketServer } from 'ws';

import config from '../config/config.js';
import { messageSocketTypes } from '../public/js/constants..js';
import app from './app.js';
import User from './models/User.js';
import UserService from './services/UserService.js';
import logger from "./utils/logger.js";



const server = http.createServer(app);
const wss = new WebSocketServer({ server });


wss.on('connection', (ws, req) => {
  logger.info(`Nouvelle connexion WebSocket depuis ${req.socket.remoteAddress}`);
  

  ws.on('message', (message) => {
    message = JSON.parse(message)
    console.log(messageSocketTypes.JOIN, message.type);
    

    switch (parseInt(message.type)) {
        case messageSocketTypes.JOIN:
            // logger.log(message);
            let user = new User(message);
            UserService.addUser(socket.id, message);    
            break;
        default:
            logger.warn('message non reconnu');
            // logger.warn(message);
            break;
    }

  });

  ws.on('close', () => {
    logger.info('Déconnexion WebSocket');
  });

  ws.on('error', (error) => {
    logger.error(`Erreur WebSocket : ${error}`);
  });
});



const PORT = config.port || process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Serveur HTTP ${PORT}`);
});
