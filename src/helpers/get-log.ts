/**
 * A logger backed by [pino](https://getpino.io/)
 *
 * The default log level is `info`, but you can change it passing a level
 * string set to one of: `"trace"`, `"debug"`, `"info"`, `"warn"`,
 * `"error"`, or `"fatal"`.
 *
 * ```js
 * app.log.debug("…so is this");
 * app.log.trace("Now we're talking");
 * app.log.info("I thought you should know…");
 * app.log.warn("Woah there");
 * app.log.error("ETOOMANYLOGS");
 * app.log.fatal("Goodbye, cruel world!");
 * ```
 */
import pino, { LoggerOptions } from "pino";
import { getTransformStream, Options, LogLevel } from "@probot/pino";

export type GetLogOptions = { level?: LogLevel } & Options;

export function getLog(options: GetLogOptions = {}) {
  const { level, ...getTransformStreamOptions } = options;

  const pinoOptions: LoggerOptions = { level: level || "info", name: "probot" };
  const transform = getTransformStream(getTransformStreamOptions);
  transform.pipe(pino.destination(1));
  const log = pino(pinoOptions, transform);

  return log;
}
