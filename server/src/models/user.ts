
import { model, ObjectId, Schema } from "mongoose";
import { StringValidation } from "zod";


export interface UserDoc {
    _id: ObjectId;
    email: string;
    role: "user" | "author";
    name?: string;
}

const userSchema = new Schema<UserDoc>({
    name: {
        type: String,
        trim: true,
        // required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'user'
    },
});



const UserModel = model("User", userSchema)


export default UserModel