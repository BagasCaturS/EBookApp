import express, { ErrorRequestHandler } from "express";
import authRouter from '@/routes/auth';
import '@/db/connect';
import { errorHandler } from "./middleware/error";
import 'express-async-errors';
import cookieParser from "cookie-parser";
import { fileParser } from "./middleware/file";
import authorRouter from "./routes/author";




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/author', authorRouter);

app.post('/test', fileParser, (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.json({})
})

app.use(errorHandler)

const port = process.env.PORT;



app.listen(port, () => {
    console.log('app listening on port ' + port);
})