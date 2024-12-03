
import { model, ObjectId, Schema } from "mongoose";
import { StringValidation } from "zod";


export interface UserDoc {
    _id: ObjectId;
    email: string;
    role: "user" | "author";
    name?: string;
    signedUp: boolean;
    avatar?: { url: string; id: string }
    authorId?: ObjectId;
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
        enum: ['user', 'author'],
        default: 'user'
    },
    signedUp: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: Object,
        url: String,
        id: String,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});



const UserModel = model("User", userSchema)


export default UserModel