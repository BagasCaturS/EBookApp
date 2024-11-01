
import { model, Schema } from "mongoose";


const userSchema = new Schema({
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