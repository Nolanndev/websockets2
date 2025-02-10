/**
 * Définit différents types de messages pouvant être échangés via un socket.
 * Cela permet de mieux structurer la logique des échanges (exemple : chat, appels WebRTC).
 */
export const messageSocketTypes = {
	MESSAGE: 1, // Message générique
	JOIN: 2, // Un utilisateur rejoint la session
	LEAVE: 3, // Un utilisateur quitte la session

	CHAT_MESSAGE: 8, // Message de chat "classique"
};
