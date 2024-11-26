import { newAuthorSchema } from "@/middleware/validator"
import { RequestHandler } from "express"
import { z } from "zod"


type AuthorHandlerBody = z.infer<typeof newAuthorSchema>


export type RequestAuthorHandler = RequestHandler<{}, {}, AuthorHandlerBody>