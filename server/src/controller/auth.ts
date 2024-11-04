import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";
import { mail } from "@/utils/mail"

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