import nodemailer from "nodemailer";

interface VerificationMailoptions {
    to: string;
    link: string;

}
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_TEST_USER,
        pass: process.env.MAILTRAP_TEST_PASS
    }
});

export const mail = {
    async sendVerificationMail(options: VerificationMailoptions) {

        await transport.sendMail({
            to: options.to,
            from: process.env.VERIFICATION_MAIL,
            subject: 'Please verify your account',
            html: `
            <div>
            <p> Click this <a href="${options.link}">link </a>to verify your account </p>
            </div>
            `
        })
    }
}