import { UserDoc } from "@/models/user";
import { Response } from "express";

type ErrorResponseType = {
    status: number;
    res: Response;
    message: string;
};

export const sendErrorResponse = ({ res, message, status }: ErrorResponseType) => {
    res.status(status).json({ message })
};


export const formatUserProfile = (user: UserDoc) => {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    }
}