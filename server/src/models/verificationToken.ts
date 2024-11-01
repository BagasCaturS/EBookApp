
import { model, Schema } from "mongoose";

const verificationTokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        default: Date.now(),
        expires: 60 * 60 * 24
    }
})

const verificationTokenModel = model("verificationToken", verificationTokenSchema);

export default verificationTokenModel