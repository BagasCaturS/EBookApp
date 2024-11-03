import { Request, Response, RequestHandler } from "express"
import crypto from "crypto";
import verificationTokenModel from "@/models/verificationToken";
import UserModel from "@/models/user";
import nodemailer from "nodemailer";


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


    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5788f27209e0e8",
      pass: "540411b54aa366"
    }
  });

  const link = `http://localhost:5050/auth/verify?token=${randomToken}&userId=${userId}`

  await transport.sendMail({
    to: user.email,
    from: 'bagascatursantoso@gmail.com',
    subject: 'Please verify your account',
    html: `
    <div>
    <p> Click this <a href="${link}">link </a>to verify your account </p>
    </div>
    `
  })

    console.log(req.body)
    res.json({ message: "check your email" })

};