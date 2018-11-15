const express = require ('express');
const bodyParser = require ('body-parser');
const _ = require ('lodash');

const {Book} = require('./models/book')

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.post('/api/books',(req, res)=>{
    const body = _.pick(req.body, ['title','author','publisher','year']);
    const book = new Book(body);
    book.save().then((book)=>{
        res.status(200).send(book);
    });
});


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});
