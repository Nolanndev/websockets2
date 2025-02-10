/**
 * Ensemble de types de messages utilisables pour la communication via Socket.
 * Cela permet de rendre le code plus lisible et de limiter les erreurs de saisie.
 */
export const messageSocketTypes = {
	MESSAGE: 1, // Message générique
	JOIN: 2, // Indique qu'un utilisateur rejoint la session
	LEAVE: 3, // Indique qu'un utilisateur quitte la session
	CHAT_MESSAGE: 8, // Message spécifique au chat
};

/**
 * Ensemble de codes de couleur pour le terminal (ANSI escape codes).
 * Peut être utilisé pour styliser du texte dans la console.
 */
export const terminalColor = {
	Black: "e[0;30m",
	Red: "e[0;31m",
	Green: "e[0;32m",
	Yellow: "e[0;33m",
	Blue: "e[0;34m",
	Purple: "e[0;35m",
	Cyan: "e[0;36m",
	White: "e[0;37m",
};
