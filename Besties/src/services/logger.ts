// src/webrtc/logger.ts

import { LOG_PREFIX } from "./constants";

/**
 * Enable/Disable logs globally.
 * Turn this off in production.
 */
const DEBUG = import.meta.env.DEV;

/**
 * Log Levels
 */
type Level = "log" | "warn" | "error" | "info";

/**
 * Generic Logger
 */
class Logger {
  private write(level: Level, prefix: string, ...args: unknown[]) {
    if (!DEBUG) return;

    const time = new Date().toLocaleTimeString();

    switch (level) {
      case "log":
        console.log(`${time} ${prefix}`, ...args);
        break;

      case "info":
        console.info(`${time} ${prefix}`, ...args);
        break;

      case "warn":
        console.warn(`${time} ${prefix}`, ...args);
        break;

      case "error":
        console.error(`${time} ${prefix}`, ...args);
        break;
    }
  }

  peer(...args: unknown[]) {
    this.write("log", LOG_PREFIX.PEER, ...args);
  }

  socket(...args: unknown[]) {
    this.write("log", LOG_PREFIX.SOCKET, ...args);
  }

  media(...args: unknown[]) {
    this.write("log", LOG_PREFIX.MEDIA, ...args);
  }

  notification(...args: unknown[]) {
    this.write("log", LOG_PREFIX.NOTIFICATION, ...args);
  }

  audio(...args: unknown[]) {
    this.write("log", LOG_PREFIX.AUDIO, ...args);
  }

  call(...args: unknown[]) {
    this.write("info", LOG_PREFIX.CALL, ...args);
  }

  warn(...args: unknown[]) {
    this.write("warn", LOG_PREFIX.ERROR, ...args);
  }

  error(...args: unknown[]) {
    this.write("error", LOG_PREFIX.ERROR, ...args);
  }
}

const logger = new Logger();

export default logger;
