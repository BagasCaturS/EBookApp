import { generateAuthLink } from "@/controller/auth";
import { emailValidationSchema, validate } from "@/middleware/validator";
import { Router } from "express";



const authRouter = Router();
authRouter.post('/generate-link', validate(emailValidationSchema.shape), generateAuthLink);

export default authRouter;
