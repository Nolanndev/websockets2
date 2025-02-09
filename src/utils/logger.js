/**
 * ==========
 * IMPORTS  
 * ==========
 */
import { mkdirSync, writeFile } from 'node:fs';
import { dirname } from 'node:path';

/**
 * ===========
 * CONSTANTES
 * ===========
 */
const Reset = "\x1b[0m"; // Code de réinitialisation du style

const Colors = { // couleurs ANSI
  Black:   { Background: "\x1b[40m", Foreground: "\x1b[30m" },
  Red:     { Background: "\x1b[41m", Foreground: "\x1b[31m" },
  Green:   { Background: "\x1b[42m", Foreground: "\x1b[32m" },
  Yellow:  { Background: "\x1b[43m", Foreground: "\x1b[33m" },
  Blue:    { Background: "\x1b[44m", Foreground: "\x1b[34m" },
  Magenta: { Background: "\x1b[45m", Foreground: "\x1b[35m" },
  Cyan:    { Background: "\x1b[46m", Foreground: "\x1b[36m" },
  White:   { Background: "\x1b[47m", Foreground: "\x1b[37m" },
  Gray:    { Background: "\x1b[100m", Foreground: "\x1b[90m" },
};


/**
 * =============
 * FONCTIONS  
 * =============
 */

/**
 * Construit deux versions d'un message :
 *  - version console (colorisée),
 *  - version fichier (sans couleurs).
 *
 * @param {String} level    - Niveau du log (INFO, WARN, ERROR, etc.)
 * @param {String} message  - Message à enregistrer
 * @param {String} bgColor  - Code couleur ANSI pour l'arrière-plan
 * @param {String} fgColor  - Code couleur ANSI pour le texte
 * @returns {{consoleMsg: string, fileMsg: string}}
 */
function buildLogMessage(level, message, bgColor = '', fgColor = '') {
  const dateStr = `[${new Date().toLocaleString()}]`;

  // Version colorisée pour la console
  // Exemple : [12/01/2023, 10:00:00] \x1b[42m INFO \x1b[0m \x1b[32m message \x1b[0m
  const consoleMsg = [
    dateStr,
    bgColor,          // Ex: "\x1b[42m"
    ` ${level} `,
    Reset,
    fgColor ? ` ${fgColor} ` : '',
    message,
    Reset
  ].join('');

  // Version texte "simple" pour l'écriture fichier
  // Exemple : [12/01/2023, 10:00:00] [INFO] message
  const fileMsg = `${dateStr} [${level}] ${message}`;

  return { consoleMsg, fileMsg };
}

/**
 * Écrit la version "plain" dans le fichier et affiche la version "colorisée" dans la console.
 *
 * @param {String} consoleMsg 
 * @param {String} fileMsg 
 */
function outputLog(consoleMsg, fileMsg) {
  const destFile = './logs/log.txt';

  // Affichage console (couleur)
  console.log(consoleMsg);

  // Création du dossier si besoin
  mkdirSync(dirname(destFile), { recursive: true }, (err) => {
    if (err) {
      console.error('Erreur lors de la création du dossier :', err);
      return;
    }
  });

  // Écriture "append" ou "overwrite" ? (ici en écrasement)
  writeFile(destFile, fileMsg + '\n', { encoding: 'utf8', flag: 'a' }, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier :', err);
    }
  });
}

/**
 * Fonctions de log pour chaque niveau.
 */

// Log général (sans couleur)
function log(message) {
  const { consoleMsg, fileMsg } = buildLogMessage('LOG', message);
  outputLog(consoleMsg, fileMsg);
}

// Info (vert)
function info(message) {
  const { consoleMsg, fileMsg } = buildLogMessage(
    'INFO',
    message,
    Colors.Green.Background,
    Colors.Green.Foreground
  );
  outputLog(consoleMsg, fileMsg);
}

// Warn (jaune)
function warn(message) {
  const { consoleMsg, fileMsg } = buildLogMessage(
    'WARN',
    message,
    Colors.Yellow.Background,
    Colors.Yellow.Foreground
  );
  outputLog(consoleMsg, fileMsg);
}

// Error (rouge)
function error(message) {
  const { consoleMsg, fileMsg } = buildLogMessage(
    'ERR',
    message,
    Colors.Red.Background,
    Colors.Red.Foreground
  );
  outputLog(consoleMsg, fileMsg);
}


/**
 * ==========
 * EXPORTS  
 * ==========
 */
const logger = {
  log,
  info,
  warn,
  error,
};

export default logger;
