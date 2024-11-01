import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if (!uri) throw new Error("MONGO_URI not found");

export const dbconnect = () => {

    mongoose.connect(uri).then(() => {
        console.log('db connected');
    }).catch((e) => {
        console.log('db connection failed', e);
    })
};