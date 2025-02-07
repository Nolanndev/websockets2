export const messageSocketTypes = {
	MESSAGE: 1,
	JOIN: 2,
	LEAVE: 3,

	// TYPING: 'typing', // prévenir l'autre utilisateur que la personne en face est en train d'écrire
	// STOP_TYPING: 'stop_typing', // prévenir l'autre utilisateur que la personne en face n'écrit plus
	// NEW_MESSAGE: 'new_message', // rajouter un petit point dans le titre de l'onglet pour signaler un nouveau message
};


export const terminalColor = {
	Black: '\e[0;30m',
	Red: '\e[0;31m',
	Green: '\e[0;32m',
	Yellow: '\e[0;33m',
	Blue: '\e[0;34m',
	Purple: '\e[0;35m',
	Cyan: '\e[0;36m',
	White: '\e[0;37m',
}