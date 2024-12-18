import { model, Model, ObjectId, Schema } from "mongoose";

export interface BookDoc {
    author: ObjectId;
    title: string;
    slug: string;
    description: string;
    language: string;
    publishedAt: Date;
    publicationName: string;
    genre: string;
    price: {
        mrp: number;
        sale: number;
    },
    cover?: {
        id: string;
        url: string;
    },
    fileInfo: {
        id: string;
        size: string;
    };
}

const bookSchema = new Schema<BookDoc>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        required: true,
        trim: true,
    },
    publicationName: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    price: {
        type: Object,
        required: true,
        mrp: {
            type: Number,
            required: true,
        },
        sale: {
            type: Number,
            required: true,
        },
    },
    cover: {
        url: String,
        id: String,
    },
    fileInfo: {
        type: Object,
        required: true,
        url: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
});


const BookModel = model("book", bookSchema)
export default BookModel as Model<BookDoc>;