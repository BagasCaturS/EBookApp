import { getAuthorDetails, registerAuthor } from "@/controller/author";
import { isAuth } from "@/middleware/auth";
import { newAuthorSchema, validate } from "@/middleware/validator";
import exp from "constants";
import { Router } from "express";

const authorRouter = Router();

authorRouter.post('/register', isAuth, validate(newAuthorSchema), registerAuthor);

authorRouter.get('/:slug', getAuthorDetails)

export default authorRouter