import { z, ZodRawShape, ZodObject } from "zod";
import { RequestHandler } from "express";

export const emailValidationSchema = {
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "invalid email type",
    }).email("invalid email"),
}

export const newUserSchema = {
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "invalid name type",
    }).min(3, "name must be at least 3 characters long").trim(),
};

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
