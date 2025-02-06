// Avoir un système de logs (utiliser des fichiers)

import { styleText } from 'node:util';

// Fonction générique pour afficher un message coloré dans la console
const log = (msg, color = 'white') => {
    console.log(styleText(color, msg))
}

// Affiche un message d'information dans la console
const info = (msg) => log(`INFO: ${msg}`, 'green')

const warn = (msg) => log(`WARN: ${msg}`, 'yellow')

const error = (msg) => log(`ERROR: ${msg}`, 'red')


let logger = {
    log: log,
    info: info,
    warn: warn,
    error: error,
}

export default logger;