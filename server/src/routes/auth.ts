import { generateAuthLink, logout, sendProfileInfo, verifyAuthToken } from "@/controller/auth";
import { isAuth } from "@/middleware/auth";
import { emailValidationSchema, validate } from "@/middleware/validator";
import { Router } from "express";



const authRouter = Router();
authRouter.post('/generate-link', validate(emailValidationSchema.shape), generateAuthLink);

authRouter.get('/verify', verifyAuthToken)
authRouter.get('/profile', isAuth, sendProfileInfo)
authRouter.post('/logout', isAuth, logout)

export default authRouter;
