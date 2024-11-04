import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";
import { mail } from "@/utils/mail"
import { sendErrorResponse } from "@/utils/helper";

export const generateAuthLink: RequestHandler = async (req, res) => {


    const { email } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
        user = await UserModel.create({ email });
    }

    const userId = user._id.toString();

    await verificationTokenModel.findOneAndDelete({ userId })

    const randomToken = crypto.randomBytes(32).toString('hex');

    await verificationTokenModel.create<{ userId: String }>({
        userId,
        token: randomToken,
    })

    const link = `${process.env.VERIFICATION_LINK}?token=${randomToken}&userId=${userId}`

    await mail.sendVerificationMail({
        link,
        to: user.email,
    })

    console.log(req.body)
    res.json({ message: "check your email" })

};

export const verifyAuthToken: RequestHandler = async (req, res) => {
    const { token, userId } = req.query

    if (typeof token !== 'string' || typeof userId !== 'string') {
        return sendErrorResponse({
            status: 403,
            message: "invalid request",
            res
        })
    }
    const verificationToken = await verificationTokenModel.findOne({ userId })
    if (!verificationToken || !verificationToken.compare(token)) {
        return sendErrorResponse({
            status: 403,
            message: "invalid resquest, token mismatch",
            res
        })
    }
    const user = await UserModel.findById(userId)
    if(!user) {
        return sendErrorResponse({
            status: 500,
            message: "Something went wrong, user not found",
            res
        })
    }

    await verificationTokenModel.findByIdAndDelete(verificationToken._id)

    
    res.json({})
}