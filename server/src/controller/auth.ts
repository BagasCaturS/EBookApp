import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";

export const generateAuthLink: RequestHandler = (req, res) => {
    const randomToken = crypto.randomBytes(32).toString('hex');

    console.log(req.body)
    res.json({ok : true})

}