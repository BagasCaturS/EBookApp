import express from "express";

const app = express();

const port = process.env.PORT || 5050;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/login', (req, res) => {
    res.send('<h1>Hello this is login page</h1>')
})

app.listen(port, () => {
    console.log('app listening on port ' + port);
})