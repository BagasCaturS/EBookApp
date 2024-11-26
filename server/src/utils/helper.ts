import { UserDoc } from "@/models/user";
import { Request, Response } from "express";

type ErrorResponseType = {
    status: number;
    res: Response;
    message: string;
};

export const sendErrorResponse = ({ res, message, status }: ErrorResponseType) => {
    res.status(status).json({ message })
};


export const formatUserProfile = (user: UserDoc): Request["user"] => {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar?.url,
    }
}