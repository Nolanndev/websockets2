
// Couleurs et codes ANSI

const Reset = "\x1b[0m"

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
}

const log = (message) => { console.log(`[${(new Date()).toLocaleString()}] ${message}`) }

const info = (message) => { console.log(`[${(new Date()).toLocaleString()}] ${Colors.Green.Background} INFO ${Reset} ${Colors.Green.Foreground} ${message} ${Reset}`) }

const warn = (message) => { console.log(`[${(new Date()).toLocaleString()}] ${Colors.Yellow.Background} INFO ${Reset} ${Colors.Yellow.Foreground} ${message} ${Reset}`) }

const error = (message) => { console.log(`[${(new Date()).toLocaleString()}] ${Colors.Red.Background} INFO ${Reset} ${Colors.Red.Foreground} ${message} ${Reset}`) }

const logger = {
    log: log,
    info: info,
    warn: warn,
    error: error,
};

export default logger;
