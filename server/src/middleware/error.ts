import { ErrorRequestHandler } from "express"
import { JsonWebTokenError } from "jsonwebtoken"

export const errorHandler: ErrorRequestHandler = ((error, req, res, next) => {
    if (error instanceof JsonWebTokenError) {
        res.status(401).json({ error: error.message });
    } else {
        res.status(500).json({ error: error.message });
    }
    next(error);
})