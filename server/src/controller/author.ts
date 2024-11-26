import { RequestAuthorHandler } from "@/types";
import { z } from "zod";


export const registerAuthor: RequestAuthorHandler<body> = (req, res) => {
    req.body.socialLinks
};