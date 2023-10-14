const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

let listOfTodos = [];

app.get('/todos', (req, res) => {
    res.status(200).json(listOfTodos);
})

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    let found = null;

    for(let i=0;i<listOfTodos.length;i++){
        if(listOfTodos[i].id == id){
            found = listOfTodos[i];
            break;
        }
    }

    if(found){
        res.status(200).json(found);
    }
    else{
        res.status(404).send('id not found');
    }
})

app.post('/newTodo', (req, res) => {
    let newObject = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };

    listOfTodos.push(newObject);
    res.status(200).json(newObject);
})

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    let found = false;

    for(let i=0;i<listOfTodos.length;i++){
        if(listOfTodos[i].id == id){
            listOfTodos.splice(i, 1);
            found = true;
            break;
        }
    }

    if(found){
        res.status(200).send('Deletion successful');
    }

    else{
        res.status(404).send('id not found');
    }
})

app.use('*', (req, res) => {
    res.status(404);
})

app.listen(port, () => {
    console.log('Todo-list listening on port 3000');
});