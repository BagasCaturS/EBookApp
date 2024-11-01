import { z, ZodRawShape, ZodObject } from "zod";
import { RequestHandler } from "express";

export const emailValidationSchema = z.object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
    }).email("invalid email"),
});

export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
    return (req, res, next) => {
        const schema: ZodObject<T> = z.object(obj);
        const result = schema.safeParse(req.body);
        if (result.success) {
            req.body = result.data;
            next();
        } else {
            const errors = result.error.flatten().fieldErrors;
            res.status(422).json({ errors });
        }
    };
};
