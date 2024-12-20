import cloudinary from "@/cloud/cloudinary";
import { Request } from "express";
import { File } from "formidable";

export const updateAvatarToCloudinary = async (
    file: File,
    avatarId?: string
) => {
    if (!file) {
        throw new Error("File is undefined");
    }

    if (avatarId) {
        await cloudinary.uploader.destroy(avatarId);
    }

    const { public_id, secure_url } = await cloudinary.uploader.upload(
        file.filepath,
        {
            width: 300,
            height: 300,
            gravity: "face",
            crop: "fill",
        }
    );

    return { id: public_id, url: secure_url };
};
