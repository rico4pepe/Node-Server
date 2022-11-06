import  rateLimit from "express-rate-limit";
import {logEvent} from "./logger.js"


export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, //1 minute
    max: 5, // Limit Each IP to 5 logins per window per minute
    message: {message: 'Too many login attempts from this IP, please try again after a 60 seconds pause'},
    handler: (req, res, next, options)=>{
        logEvent(`Too many Request: ${options.message.message}\t${req.method}\t${req.url}\t
        ${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})