import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";


export const generateAuthLink: RequestHandler = async (req, res) => {

    const { email } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
        user = await UserModel.create({ email });
    }
    
    const randomToken = crypto.randomBytes(32).toString('hex');

    await verificationTokenModel.create<{ userId: String }>({
        userId: user._id.toString(),
        token: randomToken,
    })

    console.log(req.body)
    res.json({ ok: true })

};