//imports Express module, allowing us to use Express functionalities to build server
const express = require('express'); 

//create new Express object, which allows us to handle requests made to the Express server
const app = express();

//sets PORT variable, the value of which represents the port number that our server will listen on 
const PORT = 3000;

//tells Express app to use express.json() middleware, which parses incoming JSON data
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



let todos = []; //stores to-do items

//this endpoint sends to-do list back to client upon receiving GET request at /todos URL
app.get('/todos', (req, res) => {
    res.json(todos);
});

//this endpoint adds a new item to the to-do list upon receiving a POST request
app.post('/todos', (req, res) => {
    const {todoTask} = req.body;
    const newToDo = {id: todos.length + 1, task}; //create JSON object with attribute "id" corresponding to the number on the to-do list this task takes on
    todos.push(newToDo);
    res.status(201).json(newToDo);
});


