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


export const newBookSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "invalid title type",
    }
    ).trim(),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "invalid description type",
    }).trim(),
    language: z.string({
        required_error: "Language is required",
        invalid_type_error: "invalid language type",
    }).trim(),
    // coerce akan merubah apapun menjadi string 
    publishedAt: z.coerce.date({
        required_error: "Published date is required",
        invalid_type_error: "invalid published date type",
    }),
    publicationName: z.string({
        required_error: "Publication name is required",
        invalid_type_error: "invalid publication name type",
    }).trim(),
    genre: z.string({
        required_error: "Genre is required",
        invalid_type_error: "invalid genre type",
    }).trim(),

    price: z.string({
        required_error: "Price is required",
        invalid_type_error: "invalid price type",
    }).transform((value, ctx) => {

        try {
            return JSON.parse(value)
        } catch (error) {
            ctx.addIssue({
                code: "custom", message: "Invalid price data",
            });
            return z.NEVER
        }
    }).pipe(
        z.object({
            mrp: z.number({
                required_error: "Mrp is required",
                invalid_type_error: "invalid mrp price type",
            }).nonnegative("invalid MRP"),
            sale: z.number({
                required_error: "Sale price is required",
                invalid_type_error: "invalid Sale price type",
            }).nonnegative("Invalid Sale price"),
        })
    ).refine((price) => price.sale <= price.mrp, "Sale price should be less than MRP"),

    fileInfo: z.string({
        required_error: "File info is required",
        invalid_type_error: "invalid File info type",
    }).transform((value, ctx) => {

        try {
            return JSON.parse(value)
        } catch (error) {
            ctx.addIssue({
                code: "custom", message: "Invalid file info",
            });
            return z.NEVER
        }
    }).pipe(
        z.object({
            name: z.string({
                required_error: "fileInfo.name is required",
                invalid_type_error: "invalid fileInfo.name type",
            }).trim(),
            type: z.string({
                required_error: "fileInfo.type is required",
                invalid_type_error: "invalid fileInfo.type type",
            }).trim(),
            size: z.number({
                required_error: "fileInfo.size is required",
                invalid_type_error: "invalid fileInfo.size type",
            }).nonnegative("Invalid fileInfo.size"),
        })
    )
})
