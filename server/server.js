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

app.get('/api/books', (req,res)=>{
    Book.find().then((books)=>{
        res.status(200).send(books);
    }).catch((e)=>{
        res.status(500).send();
    });
});

app.get('/api/book/:id',(req,res)=>{
    const id = req.params.id;
    Book.findById(id).then((book)=>{
        book ? res.status(200).send(book) : res.status(404).send();        
    }).catch((e)=>{
        res.status(400).send();
    });
});


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
});
