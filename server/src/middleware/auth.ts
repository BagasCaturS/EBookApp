import UserModel from "@/models/user";
import { formatUserProfile, sendErrorResponse } from "@/utils/helper";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string;
                name?: string;
                email: string;
                role: 'user' | 'author';
                avatar?: string;
                signedUp: boolean;
            };
        }
    }
}

export const isAuth: RequestHandler = async (req, res, next) => {
    const auhtToken = req.cookies.authToken
    if (!auhtToken) {
        return sendErrorResponse({
            message: 'unathorized request',
            status: 401,
            res
        })
    }

    const payload = jwt.verify(auhtToken, process.env.JWT_SECRET!) as {
        userId: string
    }


    const user = await UserModel.findById(payload.userId)
    if (!user) {
        return sendErrorResponse({
            message: 'unathorized request, user not found',
            status: 401,
            res
        })
    }
    req.user = formatUserProfile(user)

    next();

};
