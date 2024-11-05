import UserModel from "@/models/user";
import { sendErrorResponse } from "@/utils/helper";
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
            }
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
    req.user = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
    };

    next();

};