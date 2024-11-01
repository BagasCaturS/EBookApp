import express from "express";
import authRouter from '@/routes/auth';
import '@/db/connect';
const app = express();

// app.use('/auth', (req, res, next) => {
//     req.on('data', (chunk) => {
//         req.body = JSON.parse(chunk.toString());
//         next();
//     })
//     // console.log(req.body);
// }, authRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

const port = process.env.PORT;



app.listen(port, () => {
    console.log('app listening on port ' + port);
})