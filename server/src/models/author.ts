import { Model, model, ObjectId, Schema } from "mongoose";

interface AuthorDoc {
    // interface berguna untuk menentukkan bentuk dari sebauh objek atau struktur sebuah data
    // dalam hal ini bentuk objek dari AuthorDoc adalah seperti di bawah
    userId: ObjectId
    name: string
    about: string
    slug: string
    socialLinks: string[]
    books: ObjectId[]
}

const authorSchema = new Schema<AuthorDoc>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    about: {
        type: String,
        trim: true,
        required: true,
    },
    socialLinks: [String],
    books: [{
        type: Schema.Types.ObjectId,
        ref: "Book",
    }]
},
    {
        timestamps: true
    })

const AuthorModel = model("Author", authorSchema)
export default AuthorModel as Model<AuthorDoc>