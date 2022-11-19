import rateLimit from 'express-rate-limit'
import logger from '../logger';

export const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 10 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (request, response, next, options) => {
        logger.warn({ ip: request.ip, status: 429 }, `too many attempted registers per hour from ${request.ip}`);
        return response.status(options.statusCode).send(options.message);
    }
});

export const loginLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100, // Limit each IP to 100 login requests per `window` (here, per hour)
	message:
		'Too many attempted logins from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    handler: (request, response, next, options) => {
        logger.warn({ ip: request.ip, status: 429 }, `too many attempted logins per hour from ${request.ip}`);
        return response.status(options.statusCode).send(options.message);
    }
        
});