import { APP_CONFIG } from "../../config/app.config.js";
const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
export function createLogger(module) {
    const currentLevel = LOG_LEVELS[APP_CONFIG.development.logLevel];
    const enabled = APP_CONFIG.development.enableLogging;
    function log(level, message, ...args) {
        if (!enabled || LOG_LEVELS[level] < currentLevel)
            return;
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}] [${module}]`;
        switch (level) {
            case "debug":
                console.debug(prefix, message, ...args);
                break;
            case "info":
                console.info(prefix, message, ...args);
                break;
            case "warn":
                console.warn(prefix, message, ...args);
                break;
            case "error":
                console.error(prefix, message, ...args);
                break;
        }
    }
    return {
        debug: (message, ...args) => log("debug", message, ...args),
        info: (message, ...args) => log("info", message, ...args),
        warn: (message, ...args) => log("warn", message, ...args),
        error: (message, ...args) => log("error", message, ...args),
    };
}
export default createLogger;
//# sourceMappingURL=logger.js.map