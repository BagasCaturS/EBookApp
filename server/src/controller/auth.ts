import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";
import { mail } from "@/utils/mail"
import { formatUserProfile, sendErrorResponse } from "@/utils/helper";
import jwt from "jsonwebtoken";
import { strict } from "assert";

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
    if (!user) {
        return sendErrorResponse({
            status: 500,
            message: "Something went wrong, user not found",
            res
        })
    }

    await verificationTokenModel.findByIdAndDelete(verificationToken._id)

    const payload = { userId: user.id }

    const authToken = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: '15d'
    });

    res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    // res.json({ authToken, message: "success" })


    res.redirect(`${process.env.AUTH_SUCCES_URL}?profile=${JSON.stringify(formatUserProfile(user))}`)

    // res.send()

};

export const sendProfileInfo: RequestHandler = (req, res) => {
    res.json({
        profile: req.user,
    })
};

export const logout: RequestHandler = (req, res) => {
    res.clearCookie('authToken').send()
};

export const updateProfile: RequestHandler = async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(req.user.id, { name: req.body.name, signedUp: true }, {
        new: true,
    })
    if (!user) return sendErrorResponse({ res, message: "User not found", status: 500 });

    res.json({ profile: formatUserProfile(user) })
};