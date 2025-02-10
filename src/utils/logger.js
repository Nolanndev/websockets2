/**
 * =================================================
 * GESTIONNAIRE DE LOGS
 * =================================================
 * Ce module permet de gérer l'affichage et l'écriture de
 * messages de log avec différents niveaux (LOG, INFO, WARN, ERR).
 * Les messages sont colorisés dans la console et stockés
 * dans un fichier texte.
 */

/**
 * ==========
 * IMPORTS
 * ==========
 * - mkdirSync et writeFile : pour gérer la création de dossier
 *   et l'écriture dans un fichier.
 * - dirname : pour récupérer le chemin du répertoire d'un fichier.
 */
import { mkdirSync, writeFile } from "node:fs";
import { dirname } from "node:path";

/**
 * ===========
 * CONSTANTES
 * ===========
 * - Reset : code ANSI pour réinitialiser le style de la console.
 * - Colors : objets stockant les codes de couleurs en mode Fond/Avant-plan.
 */
const Reset = "\x1b[0m"; // Code de réinitialisation du style

const Colors = {
	Black: { Background: "\x1b[40m", Foreground: "\x1b[30m" },
	Red: { Background: "\x1b[41m", Foreground: "\x1b[31m" },
	Green: { Background: "\x1b[42m", Foreground: "\x1b[32m" },
	Yellow: { Background: "\x1b[43m", Foreground: "\x1b[33m" },
	Blue: { Background: "\x1b[44m", Foreground: "\x1b[34m" },
	Magenta: { Background: "\x1b[45m", Foreground: "\x1b[35m" },
	Cyan: { Background: "\x1b[46m", Foreground: "\x1b[36m" },
	White: { Background: "\x1b[47m", Foreground: "\x1b[37m" },
	Gray: { Background: "\x1b[100m", Foreground: "\x1b[90m" },
};

/**
 * =============
 * FONCTIONS
 * =============
 */

/**
 * buildLogMessage
 * ----------------
 * Construit deux versions d'un message :
 * 1) Version console (colorisée avec codes ANSI)
 * 2) Version fichier (sans les couleurs)
 *
 * @param {String} level   - Niveau du log (ex. 'INFO', 'WARN', 'ERR')
 * @param {String} message - Message à enregistrer
 * @param {String} bgColor - Code ANSI pour la couleur de fond
 * @param {String} fgColor - Code ANSI pour la couleur de texte
 * @returns {{consoleMsg: string, fileMsg: string}}
 *          - Renvoie un objet contenant le message pour la console et pour le fichier
 */
function buildLogMessage(level, message, bgColor = "", fgColor = "") {
	// Récupère la date/heure au format local
	const dateStr = `[${new Date().toLocaleString()}]`;

	// Construction du message colorisé pour la console
	// Exemple : [xx/xx/xxxx, 00:00:00] \x1b[42m INFO \x1b[0m \x1b[32m message \x1b[0m
	const consoleMsg = [
		dateStr,
		bgColor,
		` ${level} `,
		Reset,
		fgColor ? ` ${fgColor} ` : "",
		message,
		Reset,
	].join("");

	// Construction du message simple pour le fichier
	// Exemple : [xx/xx/xxxx, 00:00:00] [INFO] message
	const fileMsg = `${dateStr} [${level}] ${message}`;

	return { consoleMsg, fileMsg };
}

/**
 * outputLog
 * ---------
 * Affiche la version console (colorisée) et écrit la version "plain"
 * dans un fichier log.
 *
 * @param {String} consoleMsg - Message à afficher dans la console
 * @param {String} fileMsg    - Message à écrire dans le fichier
 */
function outputLog(consoleMsg, fileMsg) {
	// Chemin du fichier de log
	const destFile = "./logs/log.txt";

	// Affichage dans la console
	console.log(consoleMsg);

	// Création du dossier logs si nécessaire
	mkdirSync(dirname(destFile), { recursive: true }, (err) => {
		if (err) {
			console.error("Erreur lors de la création du dossier :", err);
			return;
		}
	});

	// Écriture du message dans le fichier (en mode "append")
	writeFile(
		destFile,
		fileMsg + "\n",
		{ encoding: "utf8", flag: "a" },
		(err) => {
			if (err) {
				console.error("Erreur lors de l'écriture du fichier :", err);
			}
		},
	);
}

/**
 * ==========
 * LOGGERS
 * ==========
 * Fonctions de log pour chaque niveau : log, info, warn, error.
 * Chacune utilise buildLogMessage pour générer les chaînes de texte
 * et outputLog pour afficher et écrire le résultat.
 */

/**
 * log
 * ---
 * Log général (sans couleur)
 * @param {string} message - Texte du log
 */
function log(message) {
	const { consoleMsg, fileMsg } = buildLogMessage("LOG", message);
	outputLog(consoleMsg, fileMsg);
}

/**
 * info
 * ----
 * Log niveau INFO (vert)
 * @param {string} message - Texte du log
 */
function info(message) {
	const { consoleMsg, fileMsg } = buildLogMessage(
		"INFO",
		message,
		Colors.Green.Background,
		Colors.Green.Foreground,
	);
	outputLog(consoleMsg, fileMsg);
}

/**
 * warn
 * ----
 * Log niveau WARN (jaune)
 * @param {string} message - Texte du log
 */
function warn(message) {
	const { consoleMsg, fileMsg } = buildLogMessage(
		"WARN",
		message,
		Colors.Yellow.Background,
		Colors.Yellow.Foreground,
	);
	outputLog(consoleMsg, fileMsg);
}

/**
 * error
 * -----
 * Log niveau ERROR (rouge)
 * @param {string} message - Texte du log
 */
function error(message) {
	const { consoleMsg, fileMsg } = buildLogMessage(
		"ERR",
		message,
		Colors.Red.Background,
		Colors.Red.Foreground,
	);
	outputLog(consoleMsg, fileMsg);
}

/**
 * ==========
 * EXPORTS
 * ==========
 * Exporte un objet regroupant les différentes fonctions de log.
 */
const logger = {
	log,
	info,
	warn,
	error,
};

export default logger;
