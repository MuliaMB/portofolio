/**
 * Development Logger
 * 
 * Logging utility that only outputs in development mode.
 * Automatically disabled in production builds.
 */

const isDev = process.env.NODE_ENV === "development";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogOptions {
  /** Optional context/module name */
  context?: string;
  /** Additional data to log */
  data?: unknown;
}

/**
 * Development-only logger
 */
export const devLog = {
  /**
   * Debug level log (most verbose)
   */
  debug(message: string, options?: LogOptions): void {
    if (!isDev) return;
    const prefix = options?.context ? `[${options.context}]` : "[Debug]";
    console.log(`${prefix} ${message}`, options?.data ?? "");
  },

  /**
   * Info level log
   */
  info(message: string, options?: LogOptions): void {
    if (!isDev) return;
    const prefix = options?.context ? `[${options.context}]` : "[Info]";
    console.info(`${prefix} ${message}`, options?.data ?? "");
  },

  /**
   * Warning level log
   */
  warn(message: string, options?: LogOptions): void {
    if (!isDev) return;
    const prefix = options?.context ? `[${options.context}]` : "[Warn]";
    console.warn(`${prefix} ${message}`, options?.data ?? "");
  },

  /**
   * Error level log (always logs, even in production for critical errors)
   */
  error(message: string, options?: LogOptions): void {
    const prefix = options?.context ? `[${options.context}]` : "[Error]";
    console.error(`${prefix} ${message}`, options?.data ?? "");
  },

  /**
   * Group related logs together
   */
  group(label: string, fn: () => void): void {
    if (!isDev) return;
    console.group(label);
    fn();
    console.groupEnd();
  },

  /**
   * Log performance timing
   */
  time(label: string): void {
    if (!isDev) return;
    console.time(label);
  },

  timeEnd(label: string): void {
    if (!isDev) return;
    console.timeEnd(label);
  },

  /**
   * Assert a condition (logs error if false)
   */
  assert(condition: boolean, message: string): void {
    if (!isDev) return;
    console.assert(condition, `[Assert Failed] ${message}`);
  },
};

/**
 * Create a scoped logger for a specific module
 */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: unknown) =>
      devLog.debug(message, { context, data }),
    info: (message: string, data?: unknown) =>
      devLog.info(message, { context, data }),
    warn: (message: string, data?: unknown) =>
      devLog.warn(message, { context, data }),
    error: (message: string, data?: unknown) =>
      devLog.error(message, { context, data }),
  };
}
