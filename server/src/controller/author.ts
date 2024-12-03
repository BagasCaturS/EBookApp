import AuthorModel from "@/models/author";
import UserModel from "@/models/user";
import { RequestAuthorHandler } from "@/types";
import { sendErrorResponse } from "@/utils/helper";
import slugify from "slugify";
import { z } from "zod";


export const registerAuthor: RequestAuthorHandler = async (req, res) => {
    const { body, user } = req;
    if (!user.signedUp) {
        return sendErrorResponse({
            message: "user must sign up first before registering as an author",
            status: 401,
            res
        });
    }

    const newAuthor = new AuthorModel({
        name: body.name,
        about: body.about,
        userId: user.id,
        socialLinks: body.socialLinks,
    });
    const uniqueSlug = slugify(`${newAuthor.name} ${newAuthor._id}`, {
        lower: true,
        replacement: "-",
    });
    newAuthor.slug = uniqueSlug;
    await newAuthor.save();

    await UserModel.findByIdAndUpdate(user.id, { role: "author", authorId: newAuthor._id, })
    res.json({ message: "Thanks for registering as an author." });
};