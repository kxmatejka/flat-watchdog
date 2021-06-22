import * as functions from 'firebase-functions'

export const logInfo = (...args: any[]) => (process.env.NODE_ENV) ? functions.logger.log(args) : console.log(args)

export const logWarn = (...args: any[]) => (process.env.NODE_ENV) ? functions.logger.warn(args) : console.warn(args)

export const logError = (...args: any[]) => (process.env.NODE_ENV) ? functions.logger.error(args) : console.error(args)
