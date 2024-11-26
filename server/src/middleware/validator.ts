import { z, ZodRawShape, ZodObject, ZodType } from "zod";
import { RequestHandler } from "express";

export const emailValidationSchema = z.object({
    email: z.string({
        required_error: "email is required",
        invalid_type_error: "invalid email type",
    }).email("invalid email"),
});

export const newUserSchema = z.object({
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "invalid name type",
    })
        .min(3, "name must be at least 3 characters long")
        .trim(),
});

export const newAuthorSchema = z.object({
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "invalid name type",
    }).trim().min(3, "Invalid name"),
    about: z.string({
        required_error: "about is required",
        invalid_type_error: "invalid about type",
    }).trim().min(100, "Write atlest 100 characters, about your books"),
    socialLinks: z.array(z.string().url("invalid url")).optional(),
});

export const validate = <T extends unknown>(schema: ZodType<T>): RequestHandler => {
    return (req, res, next) => {
        // const schema: ZodObject<T> = z.object(obj);
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
